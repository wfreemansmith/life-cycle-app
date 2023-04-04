<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let skillName = "";
  let skillDescription = "";

  function addSkill() {
    const newSkill = { skillName, skillDescription };
    dispatch("addSkill", newSkill);

    skillName = "";
    skillDescription = "";
  }
</script>

<div>
  <div class="input-field">
    <label for="skillName">Skill Name:</label>
    <input type="text" id="skillName" bind:value={skillName} />
  </div>
  <div class="input-field">
    <label for="skillDescription">Skill Description:</label>
    <textarea id="skillDescription" bind:value={skillDescription} rows="3" />
  </div>
  <button on:click={addSkill}>Add Skill</button>
</div>

<style>
  label {
    color: white;
  }
  input {
    font-family: 'Open Sans', sans-serif;
	font-size: 14px;
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
