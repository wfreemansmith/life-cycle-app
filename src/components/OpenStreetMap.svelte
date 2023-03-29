<script>
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onMount, onDestroy, afterUpdate } from "svelte";

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

  afterUpdate(() => {
    map.setView([latitude, longitude]);
  });

  onDestroy(() => {
    map.remove();
  });
</script>

<div id="map" style="height: 500px;" />

<form>
<label>
  Latitude:
  <input type="number" bind:value={latitude} step="0.0001" />
</label>
<label>
  Longitude:
  <input type="number" bind:value={longitude} step="0.0001" />
</label>
</form>
