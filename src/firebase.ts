import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
// Your web app's Firebase configuration
  };
  

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
