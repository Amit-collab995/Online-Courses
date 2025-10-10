// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "virtualcourses-33888.firebaseapp.com",
  projectId: "virtualcourses-33888",
  storageBucket: "virtualcourses-33888.firebasestorage.app",
  messagingSenderId: "472439042284",
  appId: "1:472439042284:web:a6d33d3a2bb37d3684f5c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()


export {auth, provider}