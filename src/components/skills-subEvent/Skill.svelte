<script>
  import { createEventDispatcher } from "svelte";
  export let skillName = "";
  export let skillDescription = "";

  const dispatch = createEventDispatcher();

  function deleteSkill() {
    dispatch("deleteSkill");
  }

  function editSkill() {
    dispatch("editSkill");
  }
</script>

<div class="skill">
  <h3>{skillName}</h3>
  <p>{skillDescription}</p>
  <button on:click={editSkill}>Edit</button>
  <button on:click={deleteSkill}>Delete</button>
</div>

<style>
  .skill {
    border: 2px solid black;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
