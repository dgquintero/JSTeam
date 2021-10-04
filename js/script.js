// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

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
    signInWithRedirect(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
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

//Sign up listener TODO!!
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        // ...
    } else {
        // User is signed out
        // ...
    }
});

//Event listener for google sign in
document.getElementById('googleBtn').addEventListener('click', googleSignIn);

//Event listener for form submit
document.getElementById('mainLogin').addEventListener('submit', submitForm);

// Database reference stuff
const database = getDatabase(app);
const userRef = ref(database, 'usuarios');

function submitForm(e) {
    e.preventDefault();

    //Get values
    let name = getInputValues('name');
    let email = getInputValues('email');

    //Set new ref on call
    const newUserRef = push(userRef);

    set(newUserRef, {
        name: name,
        email: email,
        estado: 'pendiente',
        rol: 'no asignado'
    });

    //Alert Message
    document.getElementById('sucAlert').classList.toggle('d-none');
    setTimeout(() => {
        document.getElementById('sucAlert').classList.toggle('d-none');
    }, 2000);

    //Clear form
    document.getElementById('mainLogin').reset();
    
}

// Get form values
function getInputValues(id) {
    return document.getElementById(id).value;
}