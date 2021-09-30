// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
// Google Sign-in
const provider = new GoogleAuthProvider();
const auth = getAuth();
function googleSignIn() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

//Event listener for form submit
document.getElementById('mainLogin').addEventListener('submit', submitForm);

// Database reference
const database = getDatabase(app);

function submitForm(e) {
    e.preventDefault();

    //Get values
    let name = getInputValues('name');
    let email = getInputValues('email');

    set(ref(database, 'users/'), {
        name: name,
        email: email,
        estado: 'pendiente'
    });
    console.log(name);
}

// Get form values
function getInputValues(id) {
    return document.getElementById(id).value;
}
