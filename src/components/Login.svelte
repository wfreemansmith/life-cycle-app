<script>
  import { ref, set } from "firebase/database";
  import { navigate } from "svelte-navigator";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { auth, db } from "../utils/firebase";
  import userStore from "../utils/userStore";
  import { getData } from "../utils/getdata";

  let isSignIn = false;
  let message = "";

  const toggleForm = () => {
    isSignIn = !isSignIn;
  };

  async function signUp(formData) {
    try {
      const { name, email, password, dob } = formData;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = result.user.uid;

      message = "Account created successfully";
      const userData = {
        username: email.replace(/[@.]/g, "-"),
        email,
        dob,
        name,
        uid,
      };
      userStore.set(userData);

      // Save user data to the Realtime Database
      const userRef = ref(db, `users/${userData.username}`);
      await set(userRef, userData);

      navigate("/account");
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      console.log(auth);
      message = "Logged in!";

      const uid = userCredential.user.uid;
      getData(uid); // Use uid instead of email

      navigate("/account");
    } catch (err) {
      message =
        err.code === "auth/user-not-found"
          ? "User not found"
          : err.code === "auth/wrong-password"
          ? "Password is incorrect"
          : "Could not connect to LifeCycle";
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      signUp({ name, dob, email, password });
    } else {
      message = "Logging in...";
      logIn({ email, password });
    }
  };
</script>

<main class="flex bg-black flex-col items-center w-[99vw] h-full relative">
  <div class="custom-shape-divider-top-1680002298">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"
      />
    </svg>
  </div>

  <h1 class="px-3 my-14 py-1 text-6xl text-[#f0ebd2] z-1">
    Welcome to Life Cycle!
  </h1>

  {#if isSignIn}
    <p>Already created an account?</p>
    <button on:click={toggleForm}>Log in here</button>
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
    <p class="no-account">Don't have an account?</p>
    <button on:click={toggleForm}>Sign up here</button>
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
  <div class="custom-shape-divider-bottom-1680002532">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"
      />
    </svg>
  </div>
</main>

<style>
  p {
    color: #f0ebd2;
  }

  h1 {
    z-index: 1;
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

    box-shadow: -8px 8px #f5becc;
    z-index: 1;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 2px;
    margin-top: 8px;
    z-index: 1;
    color: #f0ebd2;
    font-size: large;
  }

  input {
    padding: 10px;
    border: none;
    border-bottom: 2px solid black;
    font-size: 16px;
    background-color: #f38ba3;
    box-shadow: -10px 6px 2px black;
    z-index: 1;
  }

  button {
    padding: 10px 20px;
    background-color: #ed203d;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: -4px 4px 0px 1px #f5becc;
  }

  img {
    width: 200px;
    margin-top: 20px;
  }

  .custom-shape-divider-top-1680002298 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    z-index: 0;
  }

  .custom-shape-divider-top-1680002298 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 144px;
    z-index: 0;
  }

  .custom-shape-divider-top-1680002298 .shape-fill {
    fill: #fcba28;
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680002532 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680002532 svg {
    position: relative;
    display: block;
    width: calc(211% + 1.3px);
    height: 152px;
    transform: rotateY(180deg);
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680002532 .shape-fill {
    fill: #0cb2c0;
    z-index: 0;
  }
</style>
