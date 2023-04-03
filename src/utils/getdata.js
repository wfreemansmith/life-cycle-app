import { ref, get } from "firebase/database";
import { db } from "../utils/firebase";
import userStore from "./userStore";

let user;

export const getData = async (uid) => {
  try {
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const usersData = snapshot.val();

      const userKey = Object.keys(usersData).find((key) => {
        const userData = usersData[key];

        const uidMatch = userData.uid === uid;

        return uidMatch;
      });

      if (!userKey) {
        console.log("No data available for the specified user.");
        return;
      }

      const userData = usersData[userKey];
      userData.username = userKey;
      userData.uid = uid;

      userStore.set(userData);
    } else {
      console.log("No data available.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
