<script>
  // import stuff here...
    export let loggedInUser;
//   let user = {user};
  fetch('/api/user')
    .then(response => response.json())
    .then(data => {
      user = data;
    })
    .catch(error => console.error(error));
let avatar;

  function handleFileInputChange(event) {
    avatar = event.target.files[0];
  }
</script>

<main>
  <h1>Welcome, {loggedInUser}!</h1>
 
  
  <form>
    <label>Name:</label>
    <input type="text" value="{user.name}" />

    <label>
    Upload Avatar:
     <input type="file" on:change={handleFileInputChange} bind:value={avatar} accept="image/*" />
    </label>

    
    <label>Username:</label>
    <input type="text" value="{user.username}" />
    
    <label>Email:</label>
    <input type="email" value="{user.email}" />
    
    <button type="submit">Save Changes</button>
  </form>
  
  <button on:click={() => createLifeCycle()}>Create Life Cycle</button>
</main>


  <!-- function createLifeCycle() {
    // navigate to Poi.svelte component
  } -->


<style>
  /* add any necessary styles here */
</style>
