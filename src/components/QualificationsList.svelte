<script>
  import Qualification from "./Qualification.svelte";
  import AddQualification from "./addQualifications.svelte";

  export let qualifications = [];
  export let pathname;
  export let username;

  let showAddQualification = false;
  let qualificationToEdit = null;

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
  };

  const deleteQualification = (index) => {
    qualifications = qualifications.filter((_, i) => i !== index);
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

<!-- save button to add when at least 1 qual added -->
<!-- {#if qualifications.length > 0}
      <button on:click={save} class="save-button">Save</button>
    {/if} -->
