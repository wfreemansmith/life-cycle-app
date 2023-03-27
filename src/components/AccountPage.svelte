<script>
//       import firebase from 'firebase/app';
//   import 'firebase/auth';
//   import 'firebase/storage';
  let user = "Bob";
  let avatar;
//   let showPresets = false;
//   const storage = firebase.storage();
//   const storageRef = storage.refFromURL(
//     "gs://life-cycle-9ae8b.appspot.com/images/Avatars/cat2.png"
//   );

//   function handleFileInputChange(event) {
//     avatar = event.target.files[0];
//   }

//   const togglePresets = () => {
//     showPresets = !showPresets;
//   };

//   $: if (showPresets) {
//     storageRef
//       .getDownloadURL()
//       .then(function (url) {
//         const img = document.getElementById("presetImage");
//         img.src = url;
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
</script>

<main>
  <h1>Welcome, {user}!</h1>

  <!-- {#if avatar}
    <img src="{URL.createObjectURL(avatar)}" alt="Avatar" width="200" />
  {:else if showPresets}
    <div>
      <img id="presetImage" alt="Preset" width="200" />
      <img src="preset2.jpg" alt="Preset 2" width="200" />
      <img src="preset3.jpg" alt="Preset 3" width="200" />
      <img src="preset4.jpg" alt="Preset 4" width="200" />
      <img src="preset5.jpg" alt="Preset 5" width="200" />
      <img src="preset6.jpg" alt="Preset 6" width="200" />
    </div>
  {/if} -->

  <form>
    <label>Name:</label>
    <input type="text" value="{user}" />

    <label>
      Upload Avatar:
      <input
        type="file"
        on:change={handleFileInputChange}
        bind:value={avatar}
        accept="image/*"
      />
    </label>

    <button on:click={togglePresets}>Select Preset</button>

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
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 400px;
    margin-bottom: 2rem;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="file"],
  button[type="submit"] {
    border: 2px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #0062cc;
  }

  input[type="file"] {
    padding: 0;
  }
</style>
