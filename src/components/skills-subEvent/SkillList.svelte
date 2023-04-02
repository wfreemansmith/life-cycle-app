<script>
  import Skill from "./Skill.svelte";
  import AddSkill from "./AddSkill.svelte";

  export let skills = [];
  export let pathname;
  export let username;

  let showAddSkill = false;
  let skillToEdit = null;

  const toggleAddSkill = () => {
    showAddSkill = !showAddSkill;
    skillToEdit = null;
  };

  const skillAdded = (event) => {
    if (skillToEdit !== null) {
      skills[skillToEdit] = event.detail;
      skillToEdit = null;
    } else {
      skills = [...skills, event.detail];
    }
    showAddSkill = false;
  };

  const deleteSkill = (index) => {
    skills = skills.filter((_, i) => i !== index);
  };

  const editSkill = (index) => {
    skillToEdit = index;
    showAddSkill = true;
  };
</script>

<div>
  {#if !showAddSkill}
    {#each skills as skill, index (skill.skillName)}
      <Skill
        skillName={skill.skillName}
        skillDescription={skill.skillDescription}
        on:deleteSkill={() => deleteSkill(index)}
        on:editSkill={() => editSkill(index)}
      />
    {/each}
    <button on:click={toggleAddSkill}>
      {skillToEdit !== null ? "Edit" : "Add"} Skill
    </button>
  {/if}
  {#if showAddSkill}
    <AddSkill on:addSkill={skillAdded} {...skills[skillToEdit]} />
  {/if}
</div>

<!-- 
 {#if skills.length > 0}
      <button>Save</button>
    {/if} -->
