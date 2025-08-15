// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YAIzaSyBugRlmuhcypnIOc3iOKX73b_6BD_w-0zE",
  authDomain: "nascente-das-cores.firebaseapp.com",
  projectId: "nascente-das-cores",
  storageBucket: "nascente-das-cores.firebasestorage.app",
  messagingSenderId: "401004921563",
  appId: "1:401004921563:web:9b1ad227189b7ca89d02fe",
  measurementId: "YG-1748TGG3F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
