import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxRmQb_KsU2IURxEU-Q1OWBzV1OjC4oZQ",
  authDomain: "chatapp-5b1a6.firebaseapp.com",
  projectId: "chatapp-5b1a6",
  storageBucket: "chatapp-5b1a6.firebasestorage.app",
  messagingSenderId: "993987133726",
  appId: "1:993987133726:web:c3dcbf36b589c120e6090f",
  measurementId: "G-28MWXJHSQE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
