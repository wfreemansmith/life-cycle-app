<script>
  import { storage, imagesRef, uploadImage } from "../utils/firebase";

  async function uploadFile() {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    const storageRef = storage.ref('path/to/file');
    const snapshot = await storageRef.put(file);
    console.log('File uploaded:', snapshot);
  }
</script>

<input type="file" onchange={uploadFile}>

//  it's not necessary to include Firebase Storage code in App.svelte. You can import it in the components where you need it with adding a path as well i.e. images path.