<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Login from "./components/Login.svelte";
  import Tree from "./components/Tree.svelte";
  import AccountPage from "./components/AccountPage.svelte";
  import userStore from "./utils/userStore";
  import Nav from "./components/Nav.svelte";

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

  const appLogin = (username, dob, name) => {
    console.log("loggedInUser: ", username);
    loggedInUser = { id: username, name };
    tree[0].dob = dob;
  };
  $: loggedInUser = $userStore;
</script>


<Router>
  <div class="page">
    <Nav />
    <main
      class="main text-center flex flex-col items-start justify-center flex-wrap w-auto h-screen bg-[black]"
    >
      <Route path="/">
        <Login {appLogin} />
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


  .main {
    z-index: -1;
  }

</style>
