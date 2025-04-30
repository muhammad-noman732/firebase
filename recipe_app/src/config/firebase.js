// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC--n5Xr2oOG-YKD8fhXgRViMATXPIqmD4",
  authDomain: "recipe-application-e2e2d.firebaseapp.com",
  projectId: "recipe-application-e2e2d",
  storageBucket: "recipe-application-e2e2d.firebasestorage.app",
  messagingSenderId: "70946697059",
  appId: "1:70946697059:web:3e372fb6a3a40c24736d56",
  measurementId: "G-6VJ01W1RQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()