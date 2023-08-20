import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoE4Pyv86Gm3X7fzIWENa-QD4stIlQMtw",
  authDomain: "empathetic-proxy-s1-femi-c0b3e.firebaseapp.com",
  databaseURL: "https://empathetic-proxy-s1-femi-c0b3e-default-rtdb.firebaseio.com",
  projectId: "empathetic-proxy-s1-femi-c0b3e",
  storageBucket: "empathetic-proxy-s1-femi-c0b3e.appspot.com",
  messagingSenderId: "247897634993",
  appId: "1:247897634993:web:69dd4b2fe7c71746314a90",
  measurementId: "G-FLJB50FGKE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);