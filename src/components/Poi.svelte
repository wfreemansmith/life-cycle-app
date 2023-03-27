<script>
  import { fade } from "svelte/transition";
  import { ref, set } from "firebase/database";
  import { db } from "../utils/firebase";

  export let poi = {};
  export let addLifeEvent;
  export let deleteLifeEvent;
  export let loggedInUser = null

  const closeForm = (event) => {
    if (poi.menu === "form" && !poi.name & !poi.detail) deleteLifeEvent(poi.id);
    if (event) {
      event.preventDefault();

      set(ref(db, `users/${loggedInUser}/poi-data/${poi.id}`), {id: poi.id, name: poi.name, dob: poi.dob, detail: poi.detail})
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
    <p>{poi.dob ? poi.dob : ""}</p>
    {#if poi.menu}
      <button type="button" on:click={closeForm}>-</button>
    {:else}
      <button type="button" on:click={menuToggle}>+</button>
    {/if}
  </main>
  {#if poi.menu === "menu"}
    <div transition:fade>
      <button
        type="button"
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
          type="button"
          on:click={() => {
            deleteLifeEvent(poi.id);
          }}>Delete</button
        >
      {/if}
    </div>
  {/if}
  {#if poi.menu === "form"}
    <form
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
      <button type="submit">Ok</button>
    </form>
  {/if}
</div>

<style>
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
    width: fit-content;
    padding: 20px 50px;
    background-color: #f1ae56;
    margin: 0px 50px;
  }
</style>
