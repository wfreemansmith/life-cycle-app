<script>
  import { createEventDispatcher } from "svelte";
  export let subject = "";
  export let grade = "";
  export let date = "";
  export let additionalInfo = "";

  const dispatch = createEventDispatcher();

  function deleteQualification() {
    dispatch("deleteQualification");
  }

  function editQualification() {
    dispatch("editQualification");
  }
</script>

<div class="qualification">
  <p class="qualification-header"><strong>Subject: </strong>{subject}</p>
  <p><strong>Grade Achieved: </strong>{grade}</p>
  <p><strong>Date: </strong>{date}</p>
  {#if additionalInfo}<p>
      <strong>Additional Information: </strong>

      {additionalInfo}
    </p>{/if}
  <button on:click={editQualification}>Edit</button>
  <button on:click={deleteQualification}>Delete</button>
</div>

<style>
  label {
    color: white;
  }
  input {
    color: black;
  }
  .qualification strong {
    font-weight: bold;
  }
  /* .qualification .qualification-header {
    font-weight: bold;
  } */
  .qualification {
    border: solid black 5px;
    box-shadow: 3px 3px 3px #888;
    padding: 16px;
    margin: 16px;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
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
