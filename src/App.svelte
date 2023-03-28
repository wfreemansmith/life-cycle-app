<script>
  import Login from "./components/Login.svelte";
  import Tree from "./components/Tree.svelte";
  import AccountPage from "./components/AccountPage.svelte";
  import  userStore  from "./utils/userStore";
  
  let loggedInUser = null;
  let tree = [
    { id: 1, name: "Birth", detail: "It all starts here", dob: null, menu: null },
  ];

  const appLogin = (username, dob, name) => {
    console.log("loggedInUser: ", username)
    loggedInUser = {id: username, name};
    tree[0].dob = dob
  }
  $: loggedInUser = $userStore;
</script>

<main>
  {#if !loggedInUser}
    <Login {appLogin} />
  {:else}
    <AccountPage {loggedInUser} />
    <!-- <Tree {tree} {loggedInUser} /> -->
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>