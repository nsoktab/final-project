// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set as setFn,
  remove,
  onValue,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAORzM7sFhvRYg9lYsUIh8VAQyFwDxPuAs",
  authDomain: "final-project-baaa-2024.firebaseapp.com",
  databaseURL:
    "https://final-project-baaa-2024-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "final-project-baaa-2024",
  storageBucket: "final-project-baaa-2024.appspot.com",
  messagingSenderId: "699691161368",
  appId: "1:699691161368:web:d6cbb51d62f1d044d7b06d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, setFn as set, remove, onValue, update };
