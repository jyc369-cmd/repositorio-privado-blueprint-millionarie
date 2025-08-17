// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // REMOVIDO
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBugRlmuhcypnIOc3iOKX73b_6BD_w-0zE",
  authDomain: "nascente-das-cores.firebaseapp.com",
  projectId: "nascente-das-cores",
  storageBucket: "nascente-das-cores.firebasestorage.app",
  messagingSenderId: "401004921563",
  appId: "1:401004921563:web:9b1ad227189b7ca89d02fe",
  measurementId: "G-1748TGG3F1"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// A inicialização do Analytics foi completamente removida para evitar erros de renderização no servidor.
// export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // REMOVIDO
