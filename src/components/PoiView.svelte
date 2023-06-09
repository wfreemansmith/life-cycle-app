<script>
  import { fade } from "svelte/transition";
  import { ref, get } from "firebase/database";
  import { db } from "../utils/firebase";
  import { onMount } from "svelte";
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
  export let closeAllPopOuts;
  let fetchedData = {};
  let subEvents = {};
  let showModal = false;
  let modalImageSrc = "";

  const pathname = milestone.name.replace(/\W/g, "-");

  const toggleMenu = (value) => {
    value = milestone.menu === value ? null : value;
    closeAllPopOuts();
    milestone.menu = value;
    if (!value) return;
    fetchedData = subEvents[value];
    if (milestone.menu === "location" && !!subEvents.location)
      fetchData("location");
  };

  const fetchData = async (menu) => {
    let refPath = `users/${user.username}/milestones/${pathname}/${menu}`;
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

  function toggleImageModal(src) {
    modalImageSrc = src;
    showModal = !showModal;
  }

  onMount(() => {
    milestone.menu = null;
    get(ref(db, `users/${user.username}/milestones/${pathname}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          subEvents = snapshot.val();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
</script>

<div class="main-div" transition:fade>
  <main class="new-main">
    <h1>{milestone.name}</h1>
    <p>{milestone.detail}</p>
    <p>{milestone.date ? milestone.date.split("-").reverse().join("-") : ""}</p>

    <div class="button-list">
      {#if !!subEvents.qualifications}
        <button
          transition:fade
          type="button"
          class={`minus w-8 h-8 ${
            milestone.menu === "qualifications" ? "button-select" : "button"
          }`}
          value="qualifications"
          on:click={() => toggleMenu("qualifications")}
          ><TiMortarBoard /></button
        >
      {/if}

      {#if !!subEvents.skills}
        <button
          transition:fade
          type="button"
          class={`minus w-8 h-8 ${
            milestone.menu === "skills" ? "button-select" : "button"
          }`}
          value="skills"
          on:click={() => toggleMenu("skills")}><TiStarOutline /></button
        >
      {/if}

      {#if !!subEvents.text}
        <button
          transition:fade
          type="button"
          class={`minus w-8 h-8 ${
            milestone.menu === "text" ? "button-select" : "button"
          }`}
          value="text"
          on:click={() => toggleMenu("text")}><TiPencil /></button
        >
      {/if}

      {#if !!subEvents.images}
        <button
          transition:fade
          type="button"
          class={`minus w-8 h-8 ${
            milestone.menu === "images" ? "button-select" : "button"
          }`}
          value="images"
          on:click={() => toggleMenu("images")}><TiImageOutline /></button
        >
      {/if}

      {#if !!subEvents.location}
        <button
          transition:fade
          type="button"
          class={`minus w-8 h-8 ${
            milestone.menu === "location" ? "button-select" : "button"
          }`}
          value="location"
          on:click={() => toggleMenu("location")}><TiLocationOutline /></button
        >
      {/if}
    </div>
  </main>
</div>
{#if milestone.menu}
  <div>
    <article>
      {#if milestone.menu === "location"}
        <h1>Location</h1>
        <div id="map" />
      {:else if milestone.menu === "images"}
        <h1>Photos</h1>
        <div class="gallery">
          {#each fetchedData as image}
            <img
              src={image}
              alt=""
              class="img"
              on:click={() => toggleImageModal(image)}
              on:keydown
            />
          {/each}
        </div>
      {:else if milestone.menu === "qualifications"}
        <h1>Qualifications</h1>
        {#each fetchedData as qualification}
          <div class="qualification">
            <h2>{qualification.subject}</h2>
            <p><strong>Grade Achieved: </strong>{qualification.grade}</p>
            <p>
              <strong>Date: </strong>{qualification.date
                .split("-")
                .reverse()
                .join("-")}
            </p>
            {#if qualification.additionalInfo}<p>
                <strong>Additional Information: </strong>
                {qualification.additionalInfo}
              </p>{/if}
          </div>
        {/each}
      {:else if milestone.menu === "skills"}
        <h1>Skills</h1>
        {#each Object.entries(fetchedData) as [key, skill]}
          <div class="qualification">
            <h2>{skill.skillName}</h2>
            <p><strong>Description:</strong> {skill.skillDescription}</p>
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
{/if}

{#if showModal}
<div class="modal" on:click={toggleImageModal} on:keydown>
  <img src={modalImageSrc} alt="Gallery" class="modal-image img" />
</div>
{/if}

<style>
  #map {
    width: 100%;
    height: 75%;
  }
  article {
    border-width: 2px;
    border-style: solid;
    border-color: #66686b;
    border-radius: 10px;
    width: 400px;
    height: 400px;
    padding: 20px 50px;
    background-color: #7b5ea7;
    box-shadow: -4px 4px 0px 0px #f0c996;
    overflow-y: auto;
  }

  article::-webkit-scrollbar {
    width: 8px;
  }

  article::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  article::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }

  article::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  div {
    z-index: 1;
    padding-left: 5px;
    padding-right: 5px;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .modal-image {
    max-width: 90vh;
    max-height: 90vh;
  }

  .main-div {
    margin: 0px 25px;
  }

  .new-main {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    height: 200px;
  }

  .button-list {
    margin: 10px 0px 0px 0px;
  }

  h1 {
    color: #eff3f4;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 80;
  }

  p {
    color: #eff3f4;
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

  .button {
    background-color: #ed203d;
    margin: auto;
    min-width: 37px;
    min-height: 37px;
    padding: 4px;
  }

  .button-select {
    background-color: #eff3f4;
    margin: auto;
    min-width: 37px;
    min-height: 37px;
    padding: 4px;
  }

  .qualification strong {
    font-weight: bold;
  }

  .qualification {
    border: solid black 5px;
    box-shadow: 3px 3px 3px #888;
    padding: 16px;
    margin: 16px;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-content: center;
  }

  .img {
    width: 100%;
    margin: 0px 0px 20px 0px;
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
