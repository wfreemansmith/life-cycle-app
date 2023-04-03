<script>
  import { fade } from "svelte/transition";
  import { ref, update } from "firebase/database";
  import { db } from "../utils/firebase";
  import { get } from "firebase/database";
  import L from "leaflet";

  import {
    TiMortarBoard,
    TiStarOutline,
    TiPencil,
    TiImageOutline,
    TiLocationOutline,
  } from "svelte-icons/ti";

  export let milestone = {};
  export let user = {};
  let fetchedData = {};

  const toggleMenu = (value) => {
    milestone.menu = value;
    console.log(value);
    fetchData(value);
  };
  const pathname = milestone.name.replace(/\W/g, "-");
  const fetchData = async (menu) => {
    let refPath = `users/${user.username}/milestones/${pathname}/${menu}`;
    if (menu === "photos") {
      refPath = `users/${user.username}/milestones/${pathname}/images`;
    }
    const dataRef = ref(db, refPath);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      fetchedData = snapshot.val();

      if (
        menu === "location" &&
        fetchedData.latitude &&
        fetchedData.longitude
      ) {
        const map = L.map("map").setView(
          [fetchedData.latitude, fetchedData.longitude],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([fetchedData.latitude, fetchedData.longitude]).addTo(map);
      }
    } else {
      console.log("No data available");
    }
  };
</script>

<div transition:fade>
  <main class="new-main">
    <h1>{milestone.name}</h1>
    <p>{milestone.detail}</p>
    <p>{milestone.date ? milestone.date : ""}</p>

    <button
      transition:fade
      type="button"
      class="minus w-8 h-8"
      value="qualifications"
      on:click={() => toggleMenu("qualifications")}><TiMortarBoard /></button
    >

    <button
      transition:fade
      type="button"
      class="plus w-8 h-8"
      value="skills"
      on:click={() => toggleMenu("skills")}><TiStarOutline /></button
    >

    <button
      transition:fade
      type="button"
      class="minus w-8 h-8"
      value="text"
      on:click={() => toggleMenu("text")}><TiPencil /></button
    >

    <button
      transition:fade
      type="button"
      class="minus w-8 h-8"
      value="photos"
      on:click={() => toggleMenu("photos")}><TiImageOutline /></button
    >

    <button
      transition:fade
      type="button"
      class="minus w-8 h-8"
      value="location"
      on:click={() => toggleMenu("location")}><TiLocationOutline /></button
    >
  </main>
</div>
<div>
  <article>
    {#if milestone.menu === "location"}
      <h1>Location</h1>
      <div id="map" />
      {#if fetchedData.latitude && fetchedData.longitude}
        <p>Latitude: {fetchedData.latitude}</p>
        <p>Longitude: {fetchedData.longitude}</p>
      {/if}
    {:else if milestone.menu === "photos"}
      <h1>Photos</h1>
      {#each Object.entries(fetchedData) as [key, photo]}
        <img src={photo} alt="Photo" />
      {/each}
    {:else if milestone.menu === "qualifications"}
      <h1>Qualifications</h1>
      {#each Object.entries(fetchedData) as [key, qualification]}
        <div>
          <h2>{qualification.subject}</h2>
          <p>Grade: {qualification.grade}</p>
          <p>Date: {qualification.date}</p>
          <p>Additional Info: {qualification.additionalInfo}</p>
        </div>
      {/each}
    {:else if milestone.menu === "skills"}
      <h1>Skills</h1>
      {#each Object.entries(fetchedData) as [key, skill]}
        <div>
          <h2>{skill.skillName}</h2>
          <p>Description: {skill.skillDescription}</p>
        </div>
      {/each}
    {:else if milestone.menu === "text"}
      <h1>Text</h1>
      {#if typeof fetchedData === "object"}
        <div>
          <p>{fetchedData.input}</p>
        </div>
      {:else}
        <p>No data available</p>
      {/if}
    {/if}
  </article>
</div>

<style>
  #map {
    width: 100%;
    height: 300px;
  }
  article {
    border-width: 2px;
    border-style: solid;
    border-color: #66686b;
    border-radius: 10px;
    width: fit-content;
    padding: 20px 50px;
    background-color: #7b5ea7;
    margin: 0px 50px;
    box-shadow: -4px 4px 0px 0px #f0c996;
  }
  div {
    z-index: 1;
    padding-left: 5px;
    padding-right: 5px;
  }
  p {
    font-size: small;
  }
  form {
    z-index: 1;
  }
  h1 {
    color: #eff3f4;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 80;
  }
  main {
    border-width: 2px;
    border-style: solid;
    border-color: #66686b;
    border-radius: 10px;
    width: fit-content;
    padding: 20px 20px;
    background-color: #f1ae56;
    margin: 10px 50px;
    box-shadow: -4px 4px 0px 0px #f0c996;
    height: fit-content;
  }

  button {
    background-color: #ed203d;
    margin: auto;
    min-width: 15px;
    min-height: 15px;
  }

  .add-event {
    margin-top: 10px;
  }
  @keyframes append-animate {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1.2);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .new-form {
    animation: append-animate 0.3s linear;
  }

  @keyframes slidein {
    from {
      margin-left: 100%;
      width: 300%;
    }

    to {
      margin-left: 0%;
      width: 100%;
    }
  }

  .new-main {
    animation: slidein 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-fill-mode: forwards;
  }
</style>
