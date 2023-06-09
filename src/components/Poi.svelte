<script>
  import { fade } from "svelte/transition";
  import { ref, update } from "firebase/database";
  import { db } from "../utils/firebase";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import FaMinus from "svelte-icons/fa/FaMinus.svelte";
  import MdSend from "svelte-icons/md/MdSend.svelte";
  import { getData } from "../utils/getdata";
  import SubEvent from "./SubEvent.svelte";

  export let milestone = {};
  export let addMilestone;
  export let deleteLifeEvent;
  export let orderByDate;
  export let closeAllPopOuts;
  export let user = null;

  // Closes form...
  // if user closes form without filling in any details, the Milestone is deleted
  // else if form has details, update record with any changes
  const closeForm = (event) => {
    if (milestone.menu === "form" && milestone.date === "") {
      deleteLifeEvent(milestone.name);
    } else if (milestone.name !== "Birth") {
      event.preventDefault();
      orderByDate();

      const pathname = milestone.name.replace(/\W/g, "-");

      update(ref(db, `users/${user.username}/milestones/${pathname}`), {
        id: milestone.id,
        name: milestone.name,
        date: milestone.date,
        detail: milestone.detail,
        menu: null,
      })
        .then(() => {
          getData(user.uid);
          console.log("Data written successfully!");
        })
        .catch((error) => {
          console.error("Error writing data: ", error);
        });
    }
    milestone.menu = null;
  };

  // Opens menu
  const menuToggle = () => {
    closeAllPopOuts();
    milestone.menu = "menu";
  };

  const openSubEventMenu = () => {
    closeAllPopOuts();
    milestone.menu = "subevent";
  };
</script>

<div class="card-wrapper" transition:fade>
  <main class="new-main">
    <h1>{milestone.name}</h1>
    <p>{milestone.detail}</p>
    <p>{milestone.date ? milestone.date.split("-").reverse().join("-") : ""}</p>
    {#if milestone.menu}
      <button type="button" class="minus w-8 h-8 button-select" on:click={closeForm}
        ><FaMinus /></button
      >
    {:else}
      <button type="button" class="plus w-8 h-8" on:click={menuToggle}
        ><FaPlus /></button
      >
    {/if}
  </main>
  {#if milestone.menu === "menu"}
    <div transition:fade class="add-event-div">
      {#if milestone.name !== "Birth"}
        <button type="button" on:click={openSubEventMenu}>Branch out</button>
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
            deleteLifeEvent(milestone.name);
          }}>Delete</button
        >
      {/if}
      <button
        type="button"
        class="add-event"
        id="add-event"
        on:click={() => {
          addMilestone(milestone.name);
        }}>Add new milestone</button
      >
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
      <input id="name" bind:value={milestone.name} type="text" required />
      <label for="detail">Tell us more</label>
      <input id="detail" bind:value={milestone.detail} type="text" required />
      <label for="date">Date</label>
      <input
        id="date"
        bind:value={milestone.date}
        type="date"
        min={user.dob}
        required
      />
      <button type="submit" class="send w-8 h-8"><MdSend /></button>
    </form>
  {/if}
  {#if milestone.menu === "subevent"}
    <SubEvent
      username={user.username}
      pathname={milestone.name.replace(/\W/g, "-")}
    />{/if}
</div>

<style>
  div {
    z-index: 1;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 20px;
    height: 90vh;
  }
  .card-wrapper {
    transition: width 4s;
    height: 200px;
  }

  .new-main {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    height: 200px;
  }

  form {
    z-index: 1;
  }
  h1 {
    color: #eff3f4;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 80;
  }

  input {
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    font-weight: bold;
  }

  .card-wrapper {
    justify-content: start;
    width: 385px;
    height: 180px;
  }

  main {
    position: relative;
    background: #f1ae56;
    border: 4px solid #66686b;
    margin-right: 100px;
    height: 180px;
  }
  main:after,
  main:before {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  main:after {
    border-color: rgba(241, 174, 86, 0);
    border-left-color: #f1ae56;
    border-width: 30px;
    margin-top: -30px;
  }
  main:before {
    border-color: rgba(102, 104, 107, 0);
    border-left-color: #66686b;
    border-width: 36px;
    margin-top: -36px;
  }

  button {
    background-color: #ed203d;
    min-width: 15px;
    border: none;
    padding: 2px;
    margin-bottom: 20px
  }

  .button-select {
    background-color: #eff3f4;
    min-width: 15px;
    border: none;
    padding: 2px;
    margin-bottom: 20px
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
  .new-form input {
    font-weight: bold;
  }

  @keyframes slidein {
    from {
      margin-left: 100%;
      width: 300%;
    }

    to {
      margin-left: 0%;
      width: 100%;
    }
  }

  .new-main {
    animation: slidein 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-fill-mode: forwards;
  }
</style>
