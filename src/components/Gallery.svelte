<script>
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { ref as dbRef, update, get } from "firebase/database";
  import { storage, db } from "../utils/firebase";
  import { onMount } from "svelte";

  export let pathname;
  export let username;

  let file;
  let images = [];
  let currentIndex = 0;
  let showModal = false;
  let modalImageSrc = "";

  onMount(() => {
    get(dbRef(db, `users/${username}/milestones/${pathname}/images`))
      .then((snapshot) => {
        images = snapshot.val() ? snapshot.val() : [];
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function handleFileInputChange(event) {
    file = event.target.files[0];
    if (file && images.length < 10) {
      const storageRef = ref(
        storage,
        `users/${username}/gallery/${Date.now()}_${file.name}`
      );

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          images = [...images, url];
          return update(
            dbRef(db, `users/${username}/milestones/${pathname}`),
            {
              images
            }
          );
        })
        .then(() => {
          console.log("Image uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error writing data: ", error);
        });
    }
  }

  function previousImage() {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }

  function nextImage() {
    if (currentIndex < images.length - 4) {
      currentIndex++;
    }
  }

  function showImageInModal(src) {
    modalImageSrc = src;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<div>
  <input type="file" on:change={handleFileInputChange} accept="image/*" />
  {#if images.length > 0}
    <div class="image-grid">
      {#each images.slice(currentIndex, currentIndex + 4) as image (image)}
        <img
          src={image}
          alt="Gallery"
          width="100"
          on:click={() => showImageInModal(image)}
        />
      {/each}
    </div>
    <button on:click={previousImage} disabled={currentIndex === 0}>
      Previous
    </button>
    <button on:click={nextImage} disabled={currentIndex >= images.length - 4}>
      Next
    </button>
  {/if}

  {#if showModal}
    <div class="modal" on:click={closeModal}>
      <img src={modalImageSrc} alt="Gallery" class="modal-image" />
    </div>
  {/if}
</div>

<style>
  .image-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
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
    max-width: 90%;
    max-height: 90%;
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
</style>
