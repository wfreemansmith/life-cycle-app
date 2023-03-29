<script>
  import Login from "./components/Login.svelte";
  import Tree from "./components/Tree.svelte";
  import AccountPage from "./components/AccountPage.svelte";
  import userStore from "./utils/userStore";
  import Nav from "./components/Nav.svelte";
  import { Router, Route } from "svelte-navigator";

  let loggedInUser = null;
  let tree = [
    {
      id: 1,
      name: "Birth",
      detail: "It all starts here",
      dob: null,
      menu: null,
    },
  ];

  $: userStore.subscribe((user) => {
    if (user) {
      loggedInUser = user;
    } else {
      loggedInUser = null;
    }
  });
  // const appLogin = (username, dob, name) => {
  //   console.log("loggedInUser: ", username);
  //   loggedInUser = { username, name, dob };
  //   tree[0].dob = dob;
  // };
</script>

<Router>
  <div class="page">
    <Nav />
    {#if loggedInUser}
      <h1>Username: {loggedInUser.username}</h1>
    {/if}
    <main
      class="text-center flex flex-col items-start justify-center flex-wrap w-auto h-screen"
    >
      <Route path="/">
        <Login />
      </Route>
      <Route path="/account" component={AccountPage} />
      <Route path="/create">
        <Tree {tree} {loggedInUser} />
      </Route>
    </main>
  </div>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  body {
    height: fit-content;
    width: 100%;
    overflow-x: hidden;
  }
</style>
