import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKVL1wNTnK0owYs6wy6XED4pIO7Exx4SM",
  authDomain: "empathetic-proxy-s1-feminist2.firebaseapp.com",
  databaseURL: "https://empathetic-proxy-s1-feminist2-default-rtdb.firebaseio.com",
  projectId: "empathetic-proxy-s1-feminist2",
  storageBucket: "empathetic-proxy-s1-feminist2.appspot.com",
  messagingSenderId: "853662428065",
  appId: "1:853662428065:web:1c1324eca99ba2a0d839e0",
  measurementId: "G-CGXM77D63Z"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);