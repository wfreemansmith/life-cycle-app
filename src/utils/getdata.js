import { ref, get } from "firebase/database";
import { db } from "../utils/firebase";
import userStore from "./userStore";
let user;

export const getData = (username) => {
  get(ref(db, "users/" + username))
    .then((snapshot) => {
      userStore.set({ username, ...snapshot.val() });
      userStore.subscribe((data) => {
        user = data;
      });
      console.log(snapshot.val());
    })
    .catch((err) => {
      console.log(err);
    });
};
