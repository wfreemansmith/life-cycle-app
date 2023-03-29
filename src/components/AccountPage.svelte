<script>
  import { getStorage, ref, getDownloadURL } from "firebase/storage";
  import { writable } from "svelte/store";
  import { getFirestore, doc, setDoc } from "firebase/firestore";
  import { signOut } from "firebase/auth";
  import { auth } from "../utils/firebase";
  // import { getAuth } from "firebase/auth";
  import userStore from "../utils/userStore";
  import { onMount } from "svelte";

  const db = getFirestore();

  // let username = "";
  // let email = "";
  // export let loggedInUser;
  // let user = "";
  // userStore.subscribe(($user) => {
  //   user = $user;
  //   console.log("userStore updated:", user);
  // });
  let user = "";
  let file;
  let avatarURL;
  let showPresets = false;
  const storage = getStorage();
  const presetImages = [
    "preset1.png",
    "preset2.png",
    "preset3.png",
    // "preset4.png",
    // "preset5.png",
    // "preset6.png",
  ];

  const presetURLsStore = writable([]);
  const togglePresets = () => {
    showPresets = !showPresets;
  };
  // save data function
  function handleFileInputChange(event) {
    file = event.target.files[0];
    if (file) {
      avatarURL = URL.createObjectURL(file);
    }
  }

  //select an avatar preset function
  function selectPreset(preset) {
    const storageRef = ref(storage, `images/Avatars/${preset}`);
    getDownloadURL(storageRef).then((url) => {
      avatarURL = url;
    });
  }
  //sign out function
  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
      userStore.set(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  $: if (showPresets) {
    Promise.all(
      presetImages.map(async (preset) => {
        const storageRef = ref(storage, `images/Avatars/${preset}`);
        const url = await getDownloadURL(storageRef);
        return url;
      })
    ).then((urls) => presetURLsStore.set(urls));
  } else {
    presetURLsStore.set([]);
  }

  onMount(() => {
    userStore.subscribe((userData) => {
      console.log(userData, "<<<<user data in on mount");
      if (userData) {
        user = userData;
      }
    });
  });

  //save changes function
  async function saveChanges(event) {
    event.preventDefault();

    const userId = user.id;

    try {
      await db.collection("users").doc(userId).update({
        name: user.name,
        email: user.email,
        username: user.username,
        // ...
      });
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }
</script>

<main>
  <h1>Welcome, {user.name}!</h1>

  {#if avatarURL}
    <img src={avatarURL} alt="Avatar" width="200" />
  {/if}

  <div>
    <form on:submit={saveChanges}>
      <label>Name:</label>
      <input type="text" bind:value={user.name} />

      <label>Username:</label>
      <input type="text" bind:value={user.username} />

      <label>Email:</label>
      <input type="email" bind:value={user.email} />

      <label>
        Upload Avatar:
        <input type="file" on:change={handleFileInputChange} accept="image/*" />
      </label>

      <button type="button" on:click={togglePresets}>Select Preset</button>

      {#if showPresets}
        <div>
          {#each $presetURLsStore as presetURL, index}
            <img
              src={presetURL}
              alt="Preset {presetImages[index]}"
              width="100"
              height="100"
              on:click={() => selectPreset(presetImages[index])}
            />
          {/each}
        </div>
      {/if}

      <button type="submit">Save Changes</button>
    </form>
  </div>

  <button on:click={() => createLifeCycle()}>Create Life Cycle</button>

  <button on:click={handleSignOut}>Sign Out</button>
</main>

<!-- // Add the createLifeCycle() function here -->

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

  /* input[type="text"],
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
  } */

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
