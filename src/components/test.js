{
  /* <script>
  import {
    getStorage,
    ref as storageRef,
    getDownloadURL,
  } from "firebase/storage";
  import { writable } from "svelte/store";
  import { getFirestore, doc, setDoc } from "firebase/firestore";
  import { signOut } from "firebase/auth";
  import { auth } from "../utils/firebase";
  // import { getAuth } from "firebase/auth";
  import userStore from "../utils/userStore";
  import { onMount } from "svelte";
  import { getDatabase, ref as databaseRef, set } from "firebase/database";

  export const db = getDatabase(app);

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
      showPresets = !showPresets;
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
  // async function handleSignOut() {
  //   try {
  //     await signOut(auth);
  //     console.log("Signed out successfully");
  //     userStore.set(null);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // }

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

    set(ref(db, `users/${user.username}`), {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    })
      .then(() => {
        console.log("User data saved successfully");
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  }
</script>

<main
  class="relative h-full w-full justify-center items-center m-auto bg-black"
>
  <h1>Welcome, {user.name}!</h1>
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

  {#if avatarURL}
    <img src={avatarURL} alt="Avatar" width="200" />
  {/if}

  <div class="form-wrapper bg-[#7b5ea7] mt-12">
    <form
      class="flex flex-col items-center mx-3 w-[100%] mb-8"
      on:submit={saveChanges}
    >
      <label for="name">Name:</label>
      <input id="name" type="text" bind:value={user.name} />

      <label for="username">Username:</label>
      <input id="username" type="text" bind:value={user.username} />

      <label for="email">Email:</label>
      <input id="email" type="email" bind:value={user.email} />

      <label for="avatar">
        Upload Avatar:
        <input
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
        <div>
          {#each $presetURLsStore as presetURL, index}
            <img
              src={presetURL}
              alt="Preset {presetImages[index]}"
              width="100"
              height="100"
              on:click={() => selectPreset(presetImages[index])}
              on:keydown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  selectPreset(presetImages[index]);
                }
              }}
            />
          {/each}
        </div>
      {/if}

      <button type="button" on:click={saveChanges}>Save Changes</button>
    </form>
  </div>

  <button on:click={() => createLifeCycle()}>Create Life Cycle</button>
  <div class="custom-shape-divider-bottom-1680013680">
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
</main> */
// }

// login script
// <script>
//   import { ref, set } from "firebase/database";
//   import { navigate } from "svelte-navigator";
//   import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//   } from "firebase/auth";
//   import { auth, db } from "../utils/firebase";
//   import userStore from "../utils/userStore";

//   let isSignIn = false;
//   let message = "";

//   const toggleForm = () => {
//     isSignIn = !isSignIn;
//   };

//   async function signUp(formData) {
//     try {
//       const { name, email, password, dob } = formData;
//       await createUserWithEmailAndPassword(auth, email, password);
//       message = "Account created successfully";
//       userStore.set({ username: email.replace(/[@.]/g, "-"), dob, name });
//       navigate("/account");
//     } catch (err) {
//       message =
//         err.code === "auth/email-already-in-use"
//           ? "That email is already registered"
//           : "Could not connect to LifeCycle";
//     }
//   }

//   async function logIn(formData) {
//     try {
//       const { email, password } = formData;
//       await signInWithEmailAndPassword(auth, email, password);
//       message = "Logged in!";
//       userStore.set({ username: email.replace(/[@.]/g, "-") });
//       navigate("/account");
//     } catch (err) {
//       message =
//         err.code === "auth/user-not-found"
//           ? "User not found"
//           : err.code === "auth/wrong-password"
//           ? "Password is incorrect"
//           : "Could not connect to LifeCycle";
//     }
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const name = formData.get("name");
//     const dob = formData.get("dob");
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const confirmPassword = formData.get("confirmPassword");
//     console.log(formData, "<<<form data");
//     if (isSignIn) {
//       if (password !== confirmPassword) {
//         message = "Passwords do not match";
//         return;
//       }
//       message = "Creating user profile...";
//       signUp({ name, dob, email, password });
//     } else {
//       const { email, password } = Object.fromEntries(formData.entries());
//       message = "Logging in...";
//       logIn({ email, password });
//     }

//     const username = email.replace(/[@.]/g, "-");
//     set(ref(db, `users/${username}`), { name, dob }).catch(() => {
//       message = "There was a problem connecting to LifeCycle";
//     });
//   };
// </script>

