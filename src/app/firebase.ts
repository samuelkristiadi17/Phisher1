// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; // 👈 Tambahkan baris ini

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjzyECRV1GzLd14F_EAbtn-B4BFqSZwW8",
  authDomain: "sandbox-db21a.firebaseapp.com",
  projectId: "sandbox-db21a",
  storageBucket: "sandbox-db21a.firebasestorage.app",
  messagingSenderId: "577389540600",
  appId: "1:577389540600:web:ff5b0b23ba293c8df9b70d",
  measurementId: "G-ZGWYCMQPZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export Auth 
export const auth = getAuth(app); 

// Initialize and export Firestore
export const db = getFirestore(app); // 👈 Tambahkan baris ini