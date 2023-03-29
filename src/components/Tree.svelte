<script>
  import Poi from "./Poi.svelte";
  import userStore from "../utils/userStore";

  // Brings in currently logged in user from userStore
  let loggedInUser;
  userStore.subscribe((user) => {
    loggedInUser = user;
  });

  // Creates the first milestone on a new tree
  let tree = [
    {
      id: 1,
      name: "Birth",
      detail: "It all starts here",
      date: loggedInUser.dob || null,
      menu: null,
    },
  ];

  // Function to create a new milestone at any point on the tree
  const addLifeEvent = (id) => {
    console.log(tree)
    tree.forEach(event => {
      event.menu = null
    });
    const position = tree.findIndex((event) => {
      return event.id === id;
    });

    const newEvent = {
      id: tree.length + 1,
      name: "",
      detail: "",
      date: "",
      menu: "form"
    };
    tree.splice(position + 1, 0, newEvent);
    tree = tree;  
  };

  // Deletes milestone
  const deleteLifeEvent = (id) => {
    if (id === 1) return;
    const position = tree.findIndex((event) => {
      return event.id === id;
    });
    tree.splice(position, 1);
    tree = tree;  
  }

</script>

<main>
  {#each tree as poi}
    <Poi {poi} {addLifeEvent} {deleteLifeEvent} {loggedInUser}/>
  {/each}
</main>

<style>
  main {
    list-style: none;
    padding: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: flex-start;
    justify-content: flex-start;
  }
</style>
