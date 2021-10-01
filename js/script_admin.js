// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Removed Module { query, orderByChild, child, get }

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
// const provider = new GoogleAuthProvider();
// const auth = getAuth();

// function googleSignIn() {
//     signInWithRedirect(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;
//             console.log(hello)
//             // ...
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });

// }

//Sign up listener TODO!!
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         window.location.replace('http://127.0.0.1:5500/main.html');
//         // ...
//     } else {
//         // User is signed out
//         // ...
//     }
// });

//Event listener for google sign in
// document.getElementById('googleBtn').addEventListener('click', googleSignIn);

//Event listener for form submit - Agregar Producto
document.getElementById('agregarProducto').addEventListener('submit', submitForm);

// Database reference stuff
const database = getDatabase(app);
const prodRef = ref(database, 'productos');
const newProdRef = push(prodRef);

// Writing operations
function submitForm(e) {
    e.preventDefault();

    //Get values
    let id = getInputValues('inputId');
    let name = getInputValues('inputName');
    let desc = getInputValues('descripcion');
    let valor = getInputValues('valorUnitario');
    let estado = getInputValues('estado');

    set(newProdRef, {
        id: id,
        name: name,
        descripcion: desc,
        valorUnitario: valor,
        estado: estado
    });

    // TODO ADD ALERT
    // document.getElementById('sucAlert').classList.toggle('d-none');
    // setTimeout(() => {
    //     document.getElementById('sucAlert').classList.toggle('d-none');
    // }, 2000);

    //Clear form
    document.getElementById('agregarProducto').reset();
}

// Get form values
function getInputValues(id) {
    return document.getElementById(id).value;
}

// Table element
let table = document.getElementById('searchResult');

// Listing all elements from the db -- Listener method 
onValue(prodRef, (snapshot) => {
    const data = snapshot.val();
    // Clear table
    table.innerHTML = '';
    // Fill table
    for (let key in data) {
        table.insertAdjacentHTML("beforeend", `<tr><th scope="row">${data[key].id}</th><td>${data[key].name}</td><td>${data[key].descripcion}</td><td>${data[key].valorUnitario}</td><td>${data[key].estado}</td></tr>`);
    }
});

// Using get() method
// get(prodRef).then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });

// Test using queries
// const testQ = query(prodRef, orderByChild('descripcion'));
// console.log(testQ);