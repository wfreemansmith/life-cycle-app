<script>
  import { ref, set } from "firebase/database";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { auth, db } from "../utils/firebase";

  export let appLogin;

  let isSignIn = false;
  let message = "";

  const toggleForm = () => {
    isSignIn = !isSignIn;
  };

  async function signUp(formData) {
    try {
      const { email, password, dob } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
      message = "Account created successfully";
      appLogin(email.replace(/[@.]/g, "-"), dob);
    } catch (err) {
      message =
        err.code === "auth/email-already-in-use"
          ? "That email is already registered"
          : "Could not connect to LifeCycle";
    }
  }
  async function logIn(formData) {
    try {
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth, email, password);
      message = "Logged in!";
      appLogin(email.replace(/[@.]/g, "-"));
    } catch (err) {
      message =
        err.code === "auth/user-not-found"
          ? "User not found"
          : err.code === "auth/wrong-password"
          ? "Password is incorrect"
          : "Could not connect to LifeCycle";
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event.target", event.target);
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const dob = formData.get("dob");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (isSignIn) {
      if (password !== confirmPassword) {
        message = "Passwords do not match";
        return;
      }
      message = "Creating user profile...";
      signUp({ email, password });
    } else {
      message = "Loggin in...";
      logIn({ email, password });
      return;
    }

    // Write the form data to the Firebase Realtime Database
    const username = email.replace(/[@.]/g, "-"); // create a username from the user's email
    set(ref(db, "users/" + username), {
      name,
      dob,
    }).catch(() => {
      message = "There was a problem connecting to LifeCycle";
    });
  };
</script>

<main class="flex">
  <h1 class="m-auto px-3 py-5 text-6xl" >Welcome to Life Cycle!</h1>
  <!-- <img src={logo} alt="life-cycle-logo" /> -->

  {#if isSignIn}
    <p>
      Already created an account? <button on:click={toggleForm}
        >Log in here</button
      >
    </p>
    <form class="form-signup" on:submit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          name="dob"
          max={new Date().toLocaleDateString("fr-ca")}
          required
        />
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
      Don't have an account? <button on:click={toggleForm}>Sign up here</button>
    </p>
    <form class="form-signin" on:submit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button class="button" type="submit">Log In</button>
    </form>
  {/if}
  <p>{message ? message : ""}</p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ddd;
    padding: 20px;
    margin-top: 20px;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input {
    padding: 10px;
    border: none;
    border-bottom: 2px solid #ddd;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  img {
    width: 200px;
    margin-top: 20px;
  }
</style>
