<script>
  import Login from "./components/Login.svelte";
  import Tree from "./components/Tree.svelte";
  import Nav from "./components/Nav.svelte";
  
  let loggedInUser = null;
  let tree = [
    { id: 1, name: "Birth", detail: "It all starts here", dob: null, menu: null },
  ];
  const appLogin = (username, dob) => {
    console.log("loggedInUser: ", username)
    loggedInUser = username
    tree[0].dob = dob
  }
</script>
<div class="page">
<Nav />
<main class="text-center flex flex-col  items-start justify-center flex-wrap w-auto h-screen">
  {#if !loggedInUser}<Login {appLogin} />
  {:else}<Tree {tree} {loggedInUser}/>
  {/if}
  </main>
</div>

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