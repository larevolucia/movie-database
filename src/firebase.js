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
// src/firebase.js
export const uiConfig = {
    signInSuccessUrl: '/dashboard', // Redirect after successful sign-in
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true, // Require user to enter display name
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInFailure: function (error) {
            if (error.code === 'auth/email-already-in-use') {
                const email = error.email; // Get the email that caused the error
                return firebase.auth().fetchSignInMethodsForEmail(email)
                    .then((signInMethods) => {
                        if (signInMethods.length > 0) {
                            const message = `The email ${email} is already registered. Please sign in instead.`;
                            alert(message);
                            return ui.start('#firebaseui-auth-container', {
                                signInOptions: signInMethods.map(method => ({
                                    provider: method,
                                })),
                            });
                        }
                    });
            } else {
                console.error('Sign-in error:', error);
                alert(error.message); // Display other errors to the user
            }
        },
    },
};
  

// Initialize FirebaseUI
export const ui = new firebaseui.auth.AuthUI(auth);