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
      console.log("All users data:", usersData);

      const userKey = Object.keys(usersData).find((key) => {
        const userData = usersData[key];
        // console.log("Current user data:", userData);
        // console.log("Current key:", key);
        const uidMatch = userData.uid === uid;
        // console.log("uid match:", uidMatch);
        return uidMatch;
      });

      if (!userKey) {
        console.log("No data available for the specified user.");
        return;
      }

      const userData = usersData[userKey];
      userData.username = userKey;
      userData.uid = uid;
      // console.log("User data before setting to store:", userData);
      // console.log("Searching for uid:", uid);
      // console.log("User keys in usersData:", Object.keys(usersData));

      userStore.set(userData);
      console.log("Found user data:", userData);
    } else {
      console.log("No data available.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
