// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2S9QE6nLFHY5JepbfcoEMw95o2HF4Wg4",
  authDomain: "parcial2-c3d85.firebaseapp.com",
  projectId: "parcial2-c3d85",
  storageBucket: "parcial2-c3d85.firebasestorage.app",
  messagingSenderId: "355945629012",
  appId: "1:355945629012:web:ca743b1f572ce9d86574c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseStorage = getStorage(app);
const db = getFirestore()

export {app,auth,firebaseStorage,db}