import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB8Mckri_ENzOu6HsGkD28AcNUeleMJ-8w",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "login-auth-unifybangladesh.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "login-auth-unifybangladesh",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "login-auth-unifybangladesh.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "291434856427",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:291434856427:web:1c63ce83537508290ea3ae",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BQW8RKYPR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;