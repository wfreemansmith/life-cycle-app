<script>
  import Poi from "./Poi.svelte";
  import userStore from "../utils/userStore";
  import { remove, ref } from "firebase/database";
  import { db } from "../utils/firebase";
  import { getData } from "../utils/getdata";

  let user = $userStore;

  // Function to create a new milestone at any point on the tree
  const addMilestone = (name) => {
    tree.forEach((milestone) => {
      milestone.menu = null;
      if (!milestone.name & !milestone.detail) deleteLifeEvent(milestone.name);
    });
    const position = tree.findIndex((milestone) => {
      return milestone.name === name;
    });

    const newEvent = {
      id: tree.length + 1,
      name: "",
      detail: "",
      date: "",
      menu: "form",
    };
    tree.splice(position + 1, 0, newEvent);
    tree = tree;
  };

  // Orders tree array of Milestones by date
  const orderByDate = () => {
    tree.sort((a, b) => {
      const nameA = a.date;
      const nameB = b.date;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });
    tree = tree;
  };

  // Deletes milestone
  const deleteLifeEvent = (name) => {
    if (name === "Birth") return;
    const position = tree.findIndex((milestone) => {
      return milestone.name === name;
    });
    tree.splice(position, 1);

    const pathname = name.replace(/\W/g, "-");

    remove(ref(db, `users/${user.username}/milestones/${pathname}`))
      .then(() => {
        getData(user.uid);
        console.log("Data removed successfully");
      })
      .catch((error) => {
        console.error("Error removing data: ", error);
      });

    tree = tree;
  };

  // Creates the first milestone on a new tree
  let tree = [
    {
      id: 1,
      name: "Birth",
      detail: "It all starts here",
      date: user ? user.dob : "0000-00-00",
      menu: null,
    },
  ];

  if (user.hasOwnProperty("milestones")) {
    tree = [...tree, ...Object.values(user.milestones)];
    orderByDate();
  }
</script>

<main class="flex bg-black flex-col items-center w-[99vw] h-full relative">
  <div class="head custom-shape-divider-top-1680089435">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        class="shape-fill"
      />
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        class="shape-fill"
      />
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        class="shape-fill"
      />
    </svg>
  </div>
  <div class="foot custom-shape-divider-bottom-1680089599">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        class="shape-fill"
      />
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        class="shape-fill"
      />
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        class="shape-fill"
      />
    </svg>
  </div>
  {#each tree as milestone}
    <Poi {milestone} {addMilestone} {deleteLifeEvent} {user} {orderByDate} />
  {/each}
</main>

<style>
  main {
    list-style: none;
    padding: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 100%;
    width: fit-content;
    align-content: flex-start;
    justify-content: flex-start;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .custom-shape-divider-top-1680089435 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .custom-shape-divider-top-1680089435 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 254px;
    transform: rotateY(180deg);
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .custom-shape-divider-top-1680089435 .shape-fill {
    fill: #fcba2880;
  }

  .custom-shape-divider-bottom-1680089599 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .custom-shape-divider-bottom-1680089599 svg {
    position: relative;
    display: block;
    width: calc(143% + 1.3px);
    height: 254px;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .custom-shape-divider-bottom-1680089599 .shape-fill {
    fill: #0cb2c059;
  }
</style>
