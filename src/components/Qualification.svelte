<script>
  import { createEventDispatcher } from "svelte";
  export let subject = "";
  export let grade = "";
  export let date = "";
  export let additionalInfo = "";
  export let qualifications

  const dispatch = createEventDispatcher();

  function deleteQualification() {
    dispatch("deleteQualification");
  }

  function editQualification() {
    dispatch("editQualification");
  }
</script>

<div class="qualification">
  <p><strong>Subject:</strong> {subject}</p>
  <p><strong>Grade Achieved:</strong> {grade}</p>
  <p><strong>Date:</strong> {date}</p>
  {#if additionalInfo}<p>
      <strong>Additional Information:</strong>
      {additionalInfo}
    </p>{/if}
  <button on:click={editQualification}>Edit</button>
  <button on:click={deleteQualification}>Delete</button>
</div>

<style>
  .qualification {
    border: solid black 5px;
    padding: 16px;
    margin: 16px;
  }
</style>
