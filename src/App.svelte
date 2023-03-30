<script>
  import { Router, Route } from "svelte-navigator";
  import Login from "./components/Login.svelte";
  import Tree from "./components/Tree.svelte";
  import AccountPage from "./components/AccountPage.svelte";
  import TestingPage from "./components/TestingPage.svelte";
  import Nav from "./components/Nav.svelte";

  // let loggedInUser = null;

  // $: userStore.subscribe((user) => {
  //   if (user) {
  //     loggedInUser = user;
  //   } else {
  //     loggedInUser = null;
  //   }
  // });
</script>

<Router>
  <div class="page">
    <Nav />
    <main
      class="main text-center flex flex-col items-start justify-center flex-wrap w-auto h-screen bg-[black]"
    >
      <Route path="/" component={Login} />
      <Route path="/account" component={AccountPage} />
      <Route path="/create" component={Tree} />
      <Route path="/about" component={TestingPage} />
    </main>
  </div>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @import url('https://fonts.googleapis.com/css2?family=Arvo&display=swap');
  body {
    height: fit-content;
    width: 100%;
    overflow-x: hidden;
  }


  .main {
    z-index: -1;
  }

</style>
