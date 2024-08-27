// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
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
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

// FirebaseUI configuration
export const uiConfig = {
  signInSuccessUrl: '/', // Redirect URL after successful sign-in
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // Add other providers as needed
  ],
 // tosUrl: '<your-tos-url>', // Optional: Terms of Service URL
 // privacyPolicyUrl: '<your-privacy-policy-url>' // Optional: Privacy Policy URL
};

// Initialize FirebaseUI
export const ui = new firebaseui.auth.AuthUI(auth);