<script>
  import { update, ref, get } from "firebase/database";
  import { db } from "../utils/firebase";
  import { onMount } from "svelte";

  export let pathname;
  export let username;

  let additionalInfo = "";

  onMount(() => {
    get(ref(db, `users/${username}/milestones/${pathname}/text`))
      .then((snapshot) => {
        additionalInfo = snapshot.val() ? snapshot.val().input : "";
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const saveData = () => {
    event.preventDefault();

    update(ref(db, `users/${username}/milestones/${pathname}/text`), {
      input: additionalInfo,
    })
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
      });
  };
</script>

<div>
  <form class="input-field" on:submit={saveData}>
    <h2 for="additonalInfo">
      Here you can write some additional information about your milestone...
    </h2>

    <textarea id="additionalInfo" bind:value={additionalInfo} rows="10" />
    <button type="submit">Save</button>
  </form>
  <!-- <button>Save</button> -->
</div>

<!-- need to add save functionality -->

<style>
  textarea {
    width: 100%;
    height: 200px;
  }

  button {
    color: black;
    background-color: #ed203d;
    margin: auto;
    min-width: 15px;
    min-height: 15px;
    border: none;
    padding: 4px;
    margin-top: 4px;
  }
</style>
