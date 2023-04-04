<script>
  import { ref, getDownloadURL } from "firebase/storage";
  import { ref as dbRef, update } from "firebase/database";
  import { writable } from "svelte/store";
  import { db, storage } from "../utils/firebase";
  import userStore from "../utils/userStore";
  import { useNavigate } from "svelte-navigator";
  const navigate = useNavigate();
  let user = {}
  let isLoading = true;
  let file;
  let localAvatarURL;
  let showPresets = false;
  const presetImages = [
    "preset1.png",
    "preset2.png",
    "preset3.png",
    // "preset4.png",
    // "preset5.png",
    // "preset6.png",
  ];

  $: {
    user = $userStore;
    isLoading = !user;
    console.log("User data:", user);
  }

  const presetURLsStore = writable([]);
  const togglePresets = () => {
    showPresets = !showPresets;
  };
  // save data function
  function handleFileInputChange(event) {
    file = event.target.files[0];
    if (file) {
      localAvatarURL = URL.createObjectURL(file);
      showPresets = false;
    }
  }

  //select an avatar preset function
  function selectPreset(preset) {
    const storageRef = ref(storage, `images/Avatars/${preset}`);
    getDownloadURL(storageRef).then((url) => {
      localAvatarURL = url;
      showPresets = false;
    });
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

  //save changes function
  async function saveChanges(event) {
    console.log("user.username in SaveChanges", user.username);
    event.preventDefault();

    const updates = {
      name: user.name,
      email: user.email,
      uid: user.uid,
      dob: user.dob,
    };

    if (localAvatarURL) {
      updates.avatarURL = localAvatarURL;
    }
  
    const userRef = dbRef(db, `users/${user.username}`);
    update(userRef, updates)
      .then(() => {
        console.log("User data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        message = "There was a problem connecting to LifeCycle";
      });
  }
</script>

<main
  class="relative h-full min-h-screen w-full justify-center items-center m-auto bg-black"
>
  {#if isLoading}
    <h1 class="px-3 my-14 py-1 text-6xl text-[#f0ebd2] z-1">Loading...</h1>
  {:else}
    <h1 class="px-3 my-14 py-1 text-6xl text-[#f0ebd2] z-1">
      Welcome, {user.name}!
    </h1>

    <div class="custom-shape-divider-top-1680013806">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          class="shape-fill"
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          class="shape-fill"
        />
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          class="shape-fill"
        />
      </svg>
    </div>
    <span class="grid grid-cols-1 grid-rows-1">
      
      <div class="form-wrapper bg-[#7b5ea7] mt-12">
        <form
          class="flex flex-col items-center mx-3 w-[100%] mb-8"
          on:submit={saveChanges}
        >
          <label for="name">Name:</label>
          <input id="name" type="text" bind:value={user.name} />

          <label for="email">Email:</label>
          <input id="email" type="email" bind:value={user.email} />

          <label for="avatar" class="avatar-label">
            Upload Avatar:
            <input class="avatar-input"
              id="avatar"
              type="file"
              on:change={handleFileInputChange}
              accept="image/*"
              />
            </label>
            
            <button class="button-create" type="button" on:click={togglePresets}
            >Select Preset</button
            >
            
            {#if showPresets}
            <div class="inline-flex">
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
                
                <button type="button" on:click={saveChanges}>Save Changes</button>
              </form>
              {#if localAvatarURL || user.avatarURL}
                <img src={localAvatarURL || user.avatarURL} alt="Avatar" width="200" />
              {/if}
      </div>

      <!-- <button on:click={() => createLifeCycle()}>Create Life Cycle</button> -->
      <div class="foot custom-shape-divider-bottom-1680013680">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          />
        </svg>
      </div>
    </span>
  {/if}
  <section class="p-6">
    <h2 style="color:white">Get started here!</h2>
    <p style="color:white">
      To create your life cycle, click the button below.
    </p>
    <button
      class="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
      on:click={() => navigate("/create")}
    >
      Create Life Cycle
    </button>
  </section>
</main>

<style>
  h1 {
    z-index: 1;
  }
  .form-wrapper {
    box-shadow: -8px 8px #f5becc;
    border-radius: 10px;
    z-index: 1;
    align-items: center;
  }
  .button-create {
    margin-bottom: 30px;
  }
  button {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    background-color: #ed203d;
    box-shadow: -3px 3px 0px 0px #f5becc;
    z-index: 1;
    color: white;
    border: none;
    border-radius: 5px;
  }
  img {
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 2rem;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  input {
    font-family: 'Open Sans', sans-serif;
	font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-bottom: 8px;
    margin-top: 8px;
    background-color: #f38ba3;
    box-shadow: -10px 6px 2px black;
    border: none;
    border-bottom: 2px solid black;
    justify-self: auto;
    z-index: 1;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    margin: auto;
    color: #272122;
  }

  input[type="file"] {
    padding: 0;
  }
  .custom-shape-divider-bottom-1680013680 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680013680 svg {
    position: relative;
    display: block;
    width: calc(133% + 1.3px);
    height: 160px;
    transform: rotateY(180deg);
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680013680 .shape-fill {
    fill: #0cb2c0;
    z-index: 0;
  }

  .custom-shape-divider-top-1680013806 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    z-index: 0;
  }

  .custom-shape-divider-top-1680013806 svg {
    position: relative;
    display: block;
    width: calc(192% + 1.3px);
    height: 160px;
    transform: rotateY(180deg);
    z-index: 0;
  }

  .custom-shape-divider-top-1680013806 .shape-fill {
    fill: #fcba28;
    z-index: 0;
  }

  .avatar-input {
    font-family: 'Open Sans', sans-serif;
	font-size: 14px;
  }

  .avatar-label {
    /* font-size: small; */
  }

  section {
    z-index: 1;
  }

  .form-wrapper {
    width: 624px;
    height: 500px;
    margin: 0 auto;
    box-shadow: -8px 8px #f5becc;
    border-radius: 10px;
    z-index: 1;
    align-items: center;
  }

  .preset-images-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 65%;
  }

  .name.svelte {
    border-color: red;
    font-size: 18px;
  }

  span {
    justify-content: center;
  }

</style>
