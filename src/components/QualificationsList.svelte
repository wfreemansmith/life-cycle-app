<script>
  import Qualification from "./Qualification.svelte";
  import AddQualification from "./addQualifications.svelte";
  import { ref, update, get } from "firebase/database";
  import { db } from "../utils/firebase";
  import { onMount } from "svelte";

  export let qualifications = [];
  export let pathname;
  export let username;

  let showAddQualification = false;
  let qualificationToEdit = null;

  onMount(() => {
    get(ref(db, `users/${username}/milestones/${pathname}/qualifications`))
      .then((snapshot) => {
        qualifications = snapshot.val() ? snapshot.val() : []
      })
      .catch((err) => {
        console.log(err);
      });
  })

  const saveData = (func) => {
    update(ref(db, `users/${username}/milestones/${pathname}`), {
      qualifications,
    })
      .then(() => {
        console.log(`Qualification ${func} successfully`);
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
      });
  };

  const toggleAddQualification = () => {
    showAddQualification = !showAddQualification;
    qualificationToEdit = null;
  };

  const qualificationAdded = (event) => {
    if (qualificationToEdit !== null) {
      qualifications[qualificationToEdit] = event.detail;
      qualificationToEdit = null;
    } else {
      qualifications = [...qualifications, event.detail];
    }
    showAddQualification = false;
    saveData("added");
  };

  const deleteQualification = (index) => {
    qualifications = qualifications.filter((_, i) => i !== index);
    saveData("deleted");
  };

  const editQualification = (index) => {
    qualificationToEdit = index;
    showAddQualification = true;
  };
</script>

<div>
  {#if !showAddQualification}
    {#each qualifications as qualification, index (qualification.subject)}
      <Qualification
        subject={qualification.subject}
        grade={qualification.grade}
        date={qualification.date}
        additionalInfo={qualification.additionalInfo}
        on:deleteQualification={() => deleteQualification(index)}
        on:editQualification={() => editQualification(index)}
      />
    {/each}
    <button on:click={toggleAddQualification}>
      {qualificationToEdit !== null ? "Edit" : "Add"} Qualification
    </button>
  {/if}
  {#if showAddQualification}
    <AddQualification
      on:addQualification={qualificationAdded}
      {...qualifications[qualificationToEdit]}
    />
  {/if}
</div>
<style>
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
<!-- save button to add when at least 1 qual added -->
<!-- {#if qualifications.length > 0}
      <button on:click={save} class="save-button">Save</button>
    {/if} -->
