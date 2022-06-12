
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAsryquPIOVmtoF7VYlzlEXVApviBWsjQQ",
  authDomain: "tikkn-realtime.firebaseapp.com",
  projectId: "tikkn-realtime",
  databaseURL: "https://tikkn-realtime-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "tikkn-realtime.appspot.com",
  messagingSenderId: "68452499773",
  appId: "1:68452499773:web:2cdc72f1982c3c31770554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
auth.languageCode = 'no';
export const db = getDatabase();
