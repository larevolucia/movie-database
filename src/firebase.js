// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5pTS8mAAoBzWemh4U9OP3nmkilTkESxw",
    authDomain: "onscreenmania.firebaseapp.com",
    projectId: "onscreenmania",
    storageBucket: "onscreenmania.appspot.com",
    messagingSenderId: "113521716730",
    appId: "1:113521716730:web:077763dc259f93b11b8843",
    measurementId: "G-ZDSDK3T06K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };

export const googleProvider = new GoogleAuthProvider();
