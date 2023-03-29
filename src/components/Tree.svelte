<script>
  import Poi from "./Poi.svelte";
  export let tree = [];
  export let loggedInUser = null;

  const addLifeEvent = (id) => {
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
      dob: "",
      menu: "form"
    };
    tree.splice(position + 1, 0, newEvent);
    tree = tree;  
  };

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
    <Poi {poi} {addLifeEvent} {deleteLifeEvent} {loggedInUser} />
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

<script>
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";

  export let latitude = 53.4808;
  export let longitude = 2.2426;

  let map;

  function initMap() {
    map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
  }

  onMount(() => {
    initMap();
  });
</script>

<div id="map" style="height: 500px;"></div>

<label>
  Latitude:
  <input type="number" bind:value={latitude} step="0.0001" />
</label>

<label>
  Longitude:
  <input type="number" bind:value={longitude} step="0.0001" />
</label>
