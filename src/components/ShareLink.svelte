<script>
  import Tree from "./Tree.svelte";
  import { ref, get } from "firebase/database";
  import { db } from "../utils/firebase";
  import { useNavigate, useParams } from "svelte-navigator";

  const navigate = useNavigate();
  const params = useParams();

  $: username = $params.username;

  const view = true;

  const getUser = async (username) => {
    return get(ref(db, `users/${username}`)).then((snapshot) => {
      return snapshot.val() ? snapshot.val() : null;
    });
  };
</script>

<div>
  {#await getUser(username)}
    <h1 class="px-3 my-14 py-1 text-6xl text-[#f0ebd2] z-1">Loading...</h1>
  {:then viewerData}
    <Tree {view} {viewerData} />
  {:catch}
    {navigate("/")}
  {/await}
</div>