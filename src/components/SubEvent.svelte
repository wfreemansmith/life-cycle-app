<script>
  import { ref, update } from "firebase/database";
  import { db } from "../utils/firebase";
  import Gallery from "./Gallery.svelte";
  import QualificationsList from "./QualificationsList.svelte";
  import OpenStreetMap from "./OpenStreetMap.svelte";
  import TextInfo from "./TextInfo.svelte";
  import SkillList from "./skills-subEvent/SkillList.svelte";
  import {fly} from "svelte/transition"

  let eventType = "blank";

  export let pathname = "testing";
  export let username = "test-user";
  
  const toggleType = (event) => {
    eventType = event.target.value;
  };

  // Temp save function for inputted data - may be used as part of another component
  const saveData = (event) => {
    update(ref(db, `users/${username}/milestones/${pathname}/${eventType}`), {
      insertDataHere: event.target.value,
    })
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
      });
  };
</script>

<div transition:fly="{{y: 500, duration: 1000}}">
  <article>
    {#if eventType === "blank"}
      <label for="select">What do you want to add to this milestone?</label>
      <select id="select" on:change={toggleType}>
        <option value="blank"></option>
        <option value="location">Location</option>
        <option value="text">Text</option>
        <option value="photos">Photos</option>
        <option value="qualifications">Qualifications</option>
        <option value="skills">Skills</option>
      </select>
    {:else if eventType === "location"}
      <h1>Location</h1>
      <OpenStreetMap {pathname} {username}/>
      <button value="blank" on:click={toggleType}>back</button>
    {:else if eventType === "photos"}
      <h1>Photos</h1>
      <Gallery {pathname} {username}/>
      <button value="blank" on:click={toggleType}>back</button>
    {:else if eventType === "text"}
      <h1>Text</h1>
      <TextInfo {pathname} {username}/>
      <button value="blank" type="button" on:click={toggleType}>back</button>
    {:else if eventType === "qualifications"}
      <h1>Qualifications</h1>
      <QualificationsList {pathname} {username}/>
      <button value="blank" type="button" on:click={toggleType}>back</button>
    {:else if eventType === "skills"}
      <h1>Skills</h1>
      <SkillList {pathname} {username}/>
      <button value="blank" type="button" on:click={toggleType}>back</button>
    {/if}
  </article>
</div>

<style>

  div {
    z-index: 1;
    margin-top: 10px;
  }

  form {
    z-index: 1;
  }
  h1 {
    color: #eff3f4;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 100;
  }

  article {
    border-width: 2px;
    border-style: solid;
    border-color: #66686b;
    border-radius: 10px;
    width: 100%;
    height: 400px;
    padding: 20px 50px;
    background-color: #7b5ea7;
    box-shadow: -4px 4px 0px 0px #f0c996;
  }

  select {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-bottom: 8px;
    margin-top: 8px;
    background-color: #f38ba3;
    box-shadow: -10px 6px 2px black;
    border: none;
    border-bottom: 2px solid black;
    justify-self: auto;
    z-index: 1;
  }

  button {
    color: black;
    background-color: #ed203d;
    margin: auto;
    min-width: 15px;
    min-height: 15px;
    border: none;
    padding: 4px;
    margin-top: 4px;
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
</style>
