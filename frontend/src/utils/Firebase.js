import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginekart-32737.firebaseapp.com",
  projectId: "loginekart-32737",
  storageBucket: "loginekart-32737.firebasestorage.app",
  messagingSenderId: "920716640609",
  appId: "1:920716640609:web:5e6b31887f7c5ed394c520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}