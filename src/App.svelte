<script>
  import { Router, Link, Route } from "svelte-navigator";
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
</script>

<Router>
  <div class="page">
    <Nav />
    <main
      class="text-center flex flex-col items-start justify-center flex-wrap w-auto h-screen"
    >
      <Route path="/">s
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
  @import url('https://fonts.googleapis.com/css2?family=Arvo&display=swap');
  body {
    height: fit-content;
    width: 100%;
    overflow-x: hidden;
  }
</style>
