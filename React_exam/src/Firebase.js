import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiDbPYGrYm93DVkaMzm49EYiwMpdUMvQU",
  authDomain: "book-my-show-ef796.firebaseapp.com",
  projectId: "book-my-show-ef796",
  storageBucket: "book-my-show-ef796.firebasestorage.app",
  messagingSenderId: "332414953539",
  appId: "1:332414953539:web:127db8a7f5fa4c4a4fccf6",
  measurementId: "G-0D19N9BZBT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
