// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD1sww7lRPX8wgwy3Poo_BqXRHiE43uscQ",
  authDomain: "bedavailability-cf47c.firebaseapp.com",
  databaseURL: "https://bedavailability-cf47c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bedavailability-cf47c",
  storageBucket: "bedavailability-cf47c.appspot.com",
  messagingSenderId: "749785758136",
  appId: "1:749785758136:web:62f5ba8411d45776aff74d",
  measurementId: "G-JGH7XKW61S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
