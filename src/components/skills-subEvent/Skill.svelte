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
  <h3><strong>Skill: </strong></h3>
  <p>{skillName}</p>
  <p><strong>Description: </strong></p>
  <p>{skillDescription}</p>
  <button on:click={editSkill}>Edit</button>
  <button on:click={deleteSkill}>Delete</button>
</div>

<style>
  h3,
  p {
    color: white;
  }
  input {
    color: black;
  }
  .skill {
    border: 2px solid black;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 3px 3px 3px #888;
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
