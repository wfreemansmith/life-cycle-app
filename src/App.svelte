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
<div class="page h-screen">
<Nav />
<main class="text-center max-w-5xl  flex flex-col content-start items-start justify-center flex-wrap md:max-w-none">
  {#if !loggedInUser}<Login {appLogin} />
  {:else}<Tree {tree} {loggedInUser}/>
  {/if}
  </main>
</div>
