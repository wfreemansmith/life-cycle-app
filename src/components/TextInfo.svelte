<script>
  import { update, ref } from "firebase/database";
  import { db } from "../utils/firebase";

  export let pathname;
  export let username;

  let additionalInfo = "";

  const saveData = () => {
    event.preventDefault()

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
  <h1>Add some additional information about your milestone here...</h1>
  <form class="input-field" on:submit={saveData}>
    <label for="additionalInfo">Additional Information:</label>
    <textarea id="additionalInfo" bind:value={additionalInfo} rows="10" />
    <button type="submit">Save</button>
  </form>
  <!-- <button>Save</button> -->
</div>

<!-- need to add save functionality -->

<style>
  textarea {
    width: 100%;
  }
</style>
