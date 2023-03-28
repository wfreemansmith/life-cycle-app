import { writable } from "svelte/store";

const userStore = writable({
  name: "John",
  username: "",
  dob: "",
  email: "",
});

export default userStore;
