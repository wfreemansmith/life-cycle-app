import { storage } from "./firebase";
import { ref, set } from "firebase/database";

export async function uploadFile(eventId, file) {
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);

  try {
    const snapshot = await storageRef.put(file);
    console.log("File uploaded:", snapshot);

    const downloadURL = await snapshot.ref.getDownloadURL();
    console.log("Download URL:", downloadURL);

    const imagesRef = ref(db, `images/${eventId}`);
    const newImageRef = push(imagesRef);
    await set(newImageRef, { downloadURL });
    console.log("Image stored in Realtime Database with key:", newImageRef.key);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
