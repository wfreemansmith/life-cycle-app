import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export database and auth products
export const auth = getAuth(app);
export const db = getDatabase(app);

// Export storage products
export const storage = getStorage();
const imagesRef = ref(storage, "images");
export { imagesRef };

export function uploadImage(file) {
  const imageName = file.name;
  const imageRef = ref(storage, `images/${imageName}`);
  return uploadBytes(imageRef, file);
}
