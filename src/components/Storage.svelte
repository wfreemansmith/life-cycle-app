<script>
  import { onMount } from 'svelte';
  import { storage } from '../utils/firebase';
  import { imagesRef } from '../utils/firestore';

  async function uploadFile() {
    const file = fileInput.files[0];
    const storageRef = storage.ref(`images/${Date.now()}_${file.name}`);

    try {
      const snapshot = await storageRef.put(file);
      console.log('File uploaded:', snapshot);

      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log('Download URL:', downloadURL);

      const docRef = await imagesRef.add({ downloadURL });
      console.log('Image stored in Firestore with ID:', docRef.id);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  let fileInput;

  onMount(() => {
    fileInput = document.querySelector('input[type="file"]');
  });
</script>

<input type="file" onchange={uploadFile} bind:this={fileInput}>
