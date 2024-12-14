import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjVwU2ydV6A-FuNlxvtmgmEQVj4klne4A",
  authDomain: "drk-kueche-hygiene.firebaseapp.com",
  projectId: "drk-kueche-hygiene",
  storageBucket: "drk-kueche-hygiene.firebasestorage.app",
  messagingSenderId: "372718053959",
  appId: "1:372718053959:web:25c15fb716780b7ede1f62",
  measurementId: "G-CB79F7NB85"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);