<script>
  import Skill from "./Skill.svelte";
  import AddSkill from "./AddSkill.svelte";
  import { ref, update, get } from "firebase/database";
  import { db } from "../../utils/firebase";
  import { onMount } from "svelte";

  export let skills = [];
  export let pathname;
  export let username;

  let showAddSkill = false;
  let skillToEdit = null;

  onMount(() => {
    get(ref(db, `users/${username}/milestones/${pathname}/skills`))
      .then((snapshot) => {
        skills = snapshot.val() ? snapshot.val().input : [];
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const saveData = (func) => {
    update(ref(db, `users/${username}/milestones/${pathname}`), {
      skills,
    })
      .then(() => {
        console.log(`Skill ${func} successfully`);
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
      });
  };

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
    saveData("added");
  };

  const deleteSkill = (index) => {
    skills = skills.filter((_, i) => i !== index);
    saveData("added");
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
