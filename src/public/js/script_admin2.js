// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, equalTo, query, orderByChild } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

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

//Event listener for form submit - Registrar Venta
document.getElementById('agregarVenta').addEventListener('submit', submitFormVenta);

// Database reference stuff
const database = getDatabase(app);
const ventRef = ref(database, 'ventas');

function submitFormVenta(e) {
    e.preventDefault();

    //Get values
    let id = getInputValues('idVenta');
    let valorTotal = getInputValues('valorTotal');
    let idProd = getInputValues('idProducto');
    let cantidad = getInputValues('cantidad');
    let valorUnitario = getInputValues('valorUnitario');
    let fecha = getInputValues('fecha');
    let cliente = getInputValues('nombreCliente');
    let idCliente = getInputValues('idCliente');
    let vendedor = getInputValues('vendedor');

    // set new ref on call
    const newVentRef = push(ventRef);

    set(newVentRef, {
        id: id,
        valorTotal: valorTotal,
        idProd: idProd,
        cantidad: cantidad,
        valorUnitario: valorUnitario,
        fecha: fecha,
        cliente: cliente,
        idCliente: idCliente,
        vendedor: vendedor,
        estado: 'En Proceso'
    });

    //Clear form
    document.getElementById('agregarVenta').reset();

}

// Get form values
function getInputValues(id) {
    return document.getElementById(id).value;
}

// // Table element - list all elements
let table = document.getElementById('searchResult');

// Listing all elements from the db -- Listener method - It will refresh itself
onValue(ventRef, (snapshot) => {
    const data = snapshot.val();
    // Clear table
    deleteChildren(table);
    // Fill table
    for (let key in data) {
        table.insertAdjacentHTML("beforeend", `<tr><th scope="row">${data[key].id}</th><td>${data[key].vendedor}</td><td>${data[key].valorTotal}</td><td>${data[key].fecha}</td><td>${data[key].idProd}</td><td>${data[key].cantidad}</td><td>${data[key].valorUnitario}</td><td>${data[key].idCliente}</td><td>${data[key].cliente}</td><td>${data[key].estado}</td></tr>`);
    }
});

// Search function!
document.getElementById('searchForm').addEventListener('submit', searchProduct);
let searchTable = document.getElementById('searchByResult');

function searchProduct(e) {
    e.preventDefault();

    // Get search bar values
    let searchValue = getInputValues('searchValue');
    let searchOption = getInputValues('searchOption');
    let searchQuery = query(ventRef, orderByChild(searchOption), equalTo(searchValue));

    return onValue(searchQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            console.log('There is data');
            deleteChildren(searchTable);
            for (let key in data) {
                // the key value is on a invisible div!!!
                searchTable.insertAdjacentHTML('beforeend', `<div class="d-none">${key}</div>
                <tr><th scope="row">${data[key].id}</th>
                <td>${data[key].vendedor}</td>
                <td>${data[key].valorTotal}</td>
                <td>${data[key].fecha}</td>
                <td>${data[key].idProd}</td>
                <td>${data[key].cantidad}</td>
                <td>${data[key].valorUnitario}</td>
                <td>${data[key].idCliente}</td>
                <td>${data[key].cliente}</td>
                <td>${data[key].estado}</td>
                <td>
                <p><a href="#"><i class="bi bi-pencil"></i>Modificar</a></p>
                <p><a href="#"><i class="bi bi-x-circle"></i>Eliminar</a></p>
                </td>
                </tr>`);
            }
        }
        else {
            console.log('There is no data');
            deleteChildren(searchTable);
            searchTable.insertAdjacentHTML('beforeend', `<div>No Results</div>`)
        }
    }, {
        onlyOnce: true
    });

}

function deleteChildren(ele) {
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }
    // Just in case
    ele.innerHTML = '';
}