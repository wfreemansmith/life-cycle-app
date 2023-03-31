<script>
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { storage } from "../utils/firebase";
  
    let file;
    let images = [];
    let currentIndex = 0;
  
    function handleFileInputChange(event) {
      file = event.target.files[0];
      if (file && images.length < 10) {
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            images = [...images, url];
          });
        });
      }
    }
  
    function previousImage() {
      if (currentIndex > 0) {
        currentIndex--;
      }
    }
  
    function nextImage() {
      if (currentIndex < images.length - 1) {
        currentIndex++;
      }
    }
  </script>
  
  <div>
    <input type="file" on:change={handleFileInputChange} accept="image/*" />
    {#if images.length > 0}
      <div>
        <img src={images[currentIndex]} alt="Gallery Image" width="200" />
      </div>
      <button on:click={previousImage} disabled={currentIndex === 0}>
        Previous
      </button>
      <button
        on:click={nextImage}
        disabled={currentIndex === images.length - 1}
      >
        Next
      </button>
    {/if}
  </div>
  