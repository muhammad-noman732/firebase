// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrMYlEXnrw8HVur_9NL393CdnjJ-rC558",
  authDomain: "crud-a000d.firebaseapp.com",
  projectId: "crud-a000d",
  storageBucket: "crud-a000d.firebasestorage.app",
  messagingSenderId: "911140733117",
  appId: "1:911140733117:web:a54180aa00c18ea7b977d4",
  measurementId: "G-V8ND5FLH30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);