import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore"



// This info comes from and env.local file
// const firebaseConfig = {
//     apiKey: process.env.REACT_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_FIREBASE_APP_ID
// };

// This is just to make it work...for now
const firebaseConfig = {
    apiKey: "AIzaSyBVV-BwhxtlWw2f6hyFf-DwZwGgwGhjyNY",
    authDomain: "test-project-20ea7.firebaseapp.com",
    databaseURL: "https://test-project-20ea7-default-rtdb.firebaseio.com",
    projectId: "test-project-20ea7",
    storageBucket: "test-project-20ea7.appspot.com",
    messagingSenderId: "820230993295",
    appId: "1:820230993295:web:c1635d4bc2f2f22a8bc7fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Initialize Auth
export const auth = getAuth()
//Initializa Google Provider
export const provider = new GoogleAuthProvider();
// Initialize DB
export const db = getFirestore()

// Users ref
export const userRef = collection(db, "usuarios");
// Sales ref
export const saleRef = collection(db, "ventas");
// Products ref
export const prodRef = collection(db, "productos");
