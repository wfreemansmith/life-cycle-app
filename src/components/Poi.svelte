<script>
  import { fade } from "svelte/transition";
  import { ref, set } from "firebase/database";
  import { db } from "../utils/firebase";
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import FaMinus from 'svelte-icons/fa/FaMinus.svelte'
  import MdSend from 'svelte-icons/md/MdSend.svelte'
  import { gsap } from "gsap";

  export let poi = {};
  export let addLifeEvent;
  export let deleteLifeEvent;
  export let loggedInUser = null

  const closeForm = (event) => {
    if (poi.menu === "form" && !poi.name & !poi.detail) deleteLifeEvent(poi.id);
    if (event) {
      event.preventDefault();

      set(ref(db, `users/${loggedInUser.username}/poi-data/${poi.id}`), {id: poi.id, name: poi.name, date: poi.date, detail: poi.detail})
        .then(() => {
          console.log("Data written successfully!");
        })
        .catch((error) => {
          console.error("Error writing data: ", error);
        });

    }
    poi.menu = null;
  };

  const menuToggle = () => {
    poi.menu = "menu";
  };
</script>

<div transition:fade>
  <main>
    <h1>{poi.name}</h1>
    <p>{poi.detail}</p>
    <p>{poi.date ? poi.date : ""}</p>
    {#if poi.menu}
      <button type="button" class="minus w-8 h-8" on:click={closeForm}><FaMinus /></button>
    {:else}
      <button type="button" class="plus w-8 h-8" on:click={menuToggle}><FaPlus /></button>
    {/if}
  </main>
  {#if poi.menu === "menu"}
    <div transition:fade class="add-event-div">
      <button
      type="button" class="add-event" id="add-event"
      on:click={() => {
        addLifeEvent(poi.id);
      }}>Add life event</button
      >
      {#if poi.name !== "Birth"}
        <button
          type="button"
          on:click={() => {
            poi.menu = "form";
          }}>Edit</button
        >
        <button
          type="button" class="delete-event"
          on:click={() => {
            deleteLifeEvent(poi.id);
          }}>Delete</button
        >
      {/if}
    </div>
  {/if}
  {#if poi.menu === "form"}
    <form class="new-form mt-2 bg-white rounded-md"
      transition:fade
      on:submit={() => {
        closeForm(event);
      }}
    >
      <label for="name">Life event</label>
      <input id="name" autofucus bind:value={poi.name} type="text" required />
      <label for="detail">Tell us more</label>
      <input id="detail" bind:value={poi.detail} type="text" required />
      <label for="dob">Date</label>
      <input id="dob" bind:value={poi.dob} type="date" required />
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
    box-shadow: -4px 4px 0px 0px #f0c996
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
    opacity:1;
  }
}
  .new-form {
    animation: append-animate .3s linear;
  }
</style>
