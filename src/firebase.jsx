import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;