<script>
  import { fade } from "svelte/transition";
  import { ref, set } from "firebase/database";
  import { db } from "../utils/firebase";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import FaMinus from "svelte-icons/fa/FaMinus.svelte";
  import MdSend from "svelte-icons/md/MdSend.svelte";
  import { gsap } from "gsap";

  export let milestone = {};
  export let addLifeEvent;
  export let deleteLifeEvent;
  export let orderByDate;
  export let loggedInUser = null;

  const closeForm = (event) => {
    if (milestone.menu === "form" && !milestone.name & !milestone.detail) deleteLifeEvent(milestone.id);
    if (event) {
      event.preventDefault();
      orderByDate()

      set(ref(db, `users/${loggedInUser.username}/milestone-data/${milestone.id}`), {
        id: milestone.id,
        name: milestone.name,
        date: milestone.date,
        detail: milestone.detail,
      })
        .then(() => {
          console.log("Data written successfully!");
        })
        .catch((error) => {
          console.error("Error writing data: ", error);
        });
    }
    milestone.menu = null;
  };

  const menuToggle = () => {
    milestone.menu = "menu";
  };
</script>

<div transition:fade>
  <main>
    <h1>{milestone.name}</h1>
    <p>{milestone.detail}</p>
    <p>{milestone.date ? milestone.date : ""}</p>
    {#if milestone.menu}
      <button transition:fade type="button" class="minus w-8 h-8" on:click={closeForm}
        ><FaMinus /></button
      >
    {:else}
      <button transition:fade type="button" class="plus w-8 h-8" on:click={menuToggle}
        ><FaPlus /></button
      >
    {/if}
  </main>
  {#if milestone.menu === "menu"}
    <div transition:fade class="add-event-div">
      <button
        type="button"
        class="add-event"
        id="add-event"
        on:click={() => {
          addLifeEvent(milestone.id);
        }}>Add life event</button
      >
      {#if milestone.name !== "Birth"}
        <button
          type="button"
          on:click={() => {
            milestone.menu = "form";
          }}>Edit</button
        >
        <button
          type="button"
          class="delete-event"
          on:click={() => {
            deleteLifeEvent(milestone.id);
          }}>Delete</button
        >
      {/if}
    </div>
  {/if}
  {#if milestone.menu === "form"}
    <form
      class="new-form mt-2 bg-white rounded-md"
      transition:fade
      on:submit={() => {
        closeForm(event);
      }}
    >
      <label for="name">Life event</label>
      <input id="name" autofucus bind:value={milestone.name} type="text" required />
      <label for="detail">Tell us more</label>
      <input id="detail" bind:value={milestone.detail} type="text" required />
      <label for="date">Date</label>
      <input id="date" bind:value={milestone.date} type="date" required />
      <button type="submit" class="send w-8 h-8"><MdSend /></button>
    </form>
  {/if}
</div>

<style>
  div {
    z-index: 1;
  }

  form {
    z-index: 1;
  }
  h1 {
    color: #eff3f4;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  main {
    border-width: 2px;
    border-style: solid;
    border-color: #66686b;
    border-radius: 10px;
    width: fit-content;
    padding: 20px 50px;
    background-color: #f1ae56;
    margin: 0px 50px;
    box-shadow: -4px 4px 0px 0px #f0c996;
  }

  button {
    background-color: #ed203d;
    margin: auto;
    min-width: 15px;
    min-height: 15px;
  }

  .add-event {
    margin-top: 10px;
  }
  @keyframes append-animate {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1.2);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .new-form {
    animation: append-animate 0.3s linear;
  }
</style>
