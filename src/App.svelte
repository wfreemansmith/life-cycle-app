<script>
  import { Router, Route } from "svelte-navigator";
  import Login from "./components/Login.svelte";
  import Tree from "./components/Tree.svelte";
  import AccountPage from "./components/AccountPage.svelte";
  import TestingPage from "./components/TestingPage.svelte";
  import Nav from "./components/Nav.svelte";

</script>

<Router primary={false}>
  <div class="page">
    <div class="nav-wrapper">
      <Nav />
    </div>
    <main
      class="main text-center flex flex-col items-start justify-center flex-wrap w-auto h-full bg-[black]"
    >
      <Route path="/" component={Login} />
      <Route path="/account" component={AccountPage} />
      <Route path="/create" component={Tree} />
      <Route path="/about" component={TestingPage} />
      <Route path="/*">
      <h1>Sorry that page does not exist!</h1></Route>
    </main>
  </div>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @import url("https://fonts.googleapis.com/css2?family=Arvo&display=swap");
  body {
    display: inline-block;
    height: fit-content;
  }

  .page {
    display: inline-block;
    height: 100%;
    min-height: screen;
  }
  main {
    height: fit-content;
  }
  .nav-wrapper {
    width: 100%
  }
</style>
