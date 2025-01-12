// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtd7UTvrjBZVZC1xCYIhqzl2Kr8K1MS_s",
    authDomain: "eventmanagement-1ed41.firebaseapp.com",
    projectId: "eventmanagement-1ed41",
    storageBucket: "eventmanagement-1ed41.firebasestorage.app",
    messagingSenderId: "407021298466",
    appId: "1:407021298466:web:f9dde780d1cdc3e27e3b7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// for database
const db = getFirestore(app);

// Initialize Firebase Auth
let auth;
if (typeof auth === 'undefined') {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db };
 