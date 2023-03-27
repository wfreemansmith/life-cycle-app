<script>
  import Login from "./components/Login.svelte";
  import Tree from "./components/Tree.svelte";
  import AccountPage from "./components/AccountPage.svelte";
  
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

<main>
  <AccountPage {loggedInUser}/>
  <!-- {#if !loggedInUser}<Login {appLogin} />
  {:else}<Tree {tree} {loggedInUser}/>
  {/if} -->
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