import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0LfRy5cBiYGJxLXlCnhqsfZf3zbpxT7k",
  authDomain: "life-cycle-9ae8b.firebaseapp.com",
  databaseURL:
    "https://life-cycle-9ae8b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "life-cycle-9ae8b",
  storageBucket: "life-cycle-9ae8b.appspot.com",
  messagingSenderId: "757328581454",
  appId: "1:757328581454:web:5754ec0a65c3a20c64441f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export database and auth products
export const auth = getAuth(app);
export const db = getDatabase(app);
