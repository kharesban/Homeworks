// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKzjUmheyqPb51BeIrP7lNUXLQqrz2fqg",
  authDomain: "clasefirebase-b64f0.firebaseapp.com",
  projectId: "clasefirebase-b64f0",
  storageBucket: "clasefirebase-b64f0.firebasestorage.app",
  messagingSenderId: "261787169225",
  appId: "1:261787169225:web:0a5d42f3c0a38e4197b818"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firebasestorage = getStorage(app);
const db = getFirestore(app)

export {app,auth,db,firebasestorage}