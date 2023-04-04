<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let subject = "";
  let grade = "";
  let date = "";
  let additionalInfo = "";

  function addQualification() {
    const newQualification = { subject, grade, date, additionalInfo };
    dispatch("addQualification", newQualification);

    subject = "";
    grade = "";
    date = "";
    additionalInfo = "";
  }
</script>

<div>
  <div class="input-field">
    <label for="subject">Subject:</label>
    <input type="text" id="subject" bind:value={subject} required/>
  </div>
  <div class="input-field">
    <label for="grade">Grade Achieved:</label>
    <input type="text" id="grade" bind:value={grade} required/>
  </div>
  <div class="input-field">
    <label for="date">Date:</label>
    <input type="date" id="date" bind:value={date} />
  </div>
  <div class="input-field">
    <label for="additionalInfo">Additional Information (optional):</label>
    <textarea id="additionalInfo" bind:value={additionalInfo} rows="3" />
  </div>
  <button on:click={addQualification}>Add Qualification</button>
</div>

<style>
  label {
    color: white;
  }
  input {
    color: black;
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
