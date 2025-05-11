// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8Mckri_ENzOu6HsGkD28AcNUeleMJ-8w",
    authDomain: "login-auth-unifybangladesh.firebaseapp.com",
    projectId: "login-auth-unifybangladesh",
    storageBucket: "login-auth-unifybangladesh.firebasestorage.app",
    messagingSenderId: "291434856427",
    appId: "1:291434856427:web:1c63ce83537508290ea3ae",
    measurementId: "G-BQW8RKYPR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;