<script>
  import { ref, set } from "firebase/database";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { auth, db } from "../utils/firebase";

  export let appLogin;

  let isSignIn = false;
  let message = ``;

  const toggleForm = () => {
    isSignIn = !isSignIn;
  };

  async function signUp(formData) {
    try {
      const { email, password, dob } = formData;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", user);
      message = `Account created successfully`
      appLogin(email.replace(/[@.]/g, "-"), dob);
    } catch (error) {
      console.error("Error creating user:", error);
      // Display error message to the user
    }
  }
  async function logIn(formData) {
    try {
      const { email, password } = formData;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", user);
      message = `Logged in`
      appLogin(email.replace(/[@.]/g, "-"));

    } catch (error) {
      console.error("Error logging in:", error);
      // Display error message to the user
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const dob = formData.get("dob");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      // Display error message to the user
      return;
    }
    if (isSignIn) {
      signUp({ email, password });
    } else {
      logIn({ email, password });
    }
    // Write the form data to the Firebase Realtime Database
    const username = email.replace(/[@.]/g, "-"); // create a username from the user's email
    set(ref(db, "users/" + username), {
      name,
      dob,
    })
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
        // Display error message to the user
      });
  };
</script>

<main class="flex bg-[#0f0d0e] flex-col items-center w-[99vw] h-full">
  <!-- <img src={logo} alt="life-cycle-logo" /> -->
  <h1 class="px-3 my-14 py-1 text-6xl text-[#f0ebd2]" >Welcome to Life Cycle!</h1>

  {#if isSignIn}
    <p>
      Already created an account?
      
    </p>
    <button on:click={toggleForm}>Log in here</button>
    <form class="form-signup" on:submit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dob" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  {:else}
    <p>
      Don't have an account?
    </p>
      <button on:click={toggleForm}>Sign up here</button>
    <form class="form-signin" on:submit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button class="button" type="submit">Log In</button>
    </form>
  {/if}
</main>

<style>
  p {
    color:#f0ebd2
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #7b5ea7;
    padding: 20px;
    margin-top: 20px;
    height: fit-content;
    background-color: #7b5ea7;
    border-radius: 10px;
    box-shadow: -8px 8px #F5BECC
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input {
    padding: 10px;
    border: none;
    border-bottom: 2px solid black;
    font-size: 16px;
    background-color: #f38ba3;
    box-shadow: -10px 6px 2px black;
  }

  button {
    padding: 10px 20px;
    background-color: #ed203d;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: -4px 4px 0px 1px 
    #F5BECC;
  }

  img {
    width: 200px;
    margin-top: 20px;
  }
</style>
