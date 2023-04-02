<script>
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import { update, ref, get } from "firebase/database";
  import { db } from "../utils/firebase";

  export let pathname;
  export let username;

  let map;
  let marker;
  let latitude;
  let longitude;

  const saveData = () => {
    update(ref(db, `users/${username}/milestones/${pathname}/location`), {
      latitude,
      longitude,
    })
      .then(() => {
        console.log("Location saved successfully!");
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
      });
  };

  function initMap() {
    map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    map.on("click", function (e) {
      if (!marker) {
        marker = L.marker(e.latlng).addTo(map);
      } else {
        marker.setLatLng(e.latlng);
      }
      latitude = e.latlng.lat;
      longitude = e.latlng.lng;
    });
  }

  onMount(() => {
    get(ref(db, `users/${username}/milestones/${pathname}/locations`))
      .then((snapshot) => {
        if (snapshot.val()) {
          latitude = snapshot.val().latitude;
          longitude = snapshot.val().longitude;
        } else {
          latitude = 53.4808;
          longitude = -2.2426;
        }

        initMap();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  async function searchLocation(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      latitude = lat;
      longitude = lon;

      if (map) {
        map.setView([lat, lon], 13);

        if (marker) {
          marker.setLatLng([lat, lon]);
        } else {
          marker = L.marker([lat, lon]).addTo(map);
        }
      }
    }
  }
</script>

<div id="map" style="height: 500px;" />

<label>
  Search location:
  <input type="text" on:keyup={(event) => searchLocation(event.target.value)} />
  <button on:click={saveData}>Save</button>
</label>

<style>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
