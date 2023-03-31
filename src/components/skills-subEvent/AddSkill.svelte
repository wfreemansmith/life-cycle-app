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
    color: black;
  }
</style>
