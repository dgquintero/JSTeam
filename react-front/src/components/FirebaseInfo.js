import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    getDoc    
} from "firebase/firestore"



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

//verificar si el usuario se ecuentra en base de datos
let isReg = false;
// Usuario
export let usuario;
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

//Guardar con Id
export const guardarDatabaseWithId = async (nombreDatabase, id, data) => {
    try {
      const response = await setDoc(doc(db, nombreDatabase, id), data);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };


const recuperarDoc = async (q) => {
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {            
            if (doc.id) {
                isReg = true;
            } else {
                isReg = false;
            }
        });    
        
        console.log(isReg);

        if (isReg === false) {
            const user = {                
                email: usuario.email,
                nombre: usuario.displayName,
                estado: "Pendiente",
                rol: ""
            }
            guardarDatabaseWithId('usuarios', usuario.uid, user)
        }


    } catch (e) {
        throw new Error(e)
    }
}


export const signGoogle = async (result) => {

    signInWithPopup(auth, provider)
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            console.log(result.user.email);
            const q = query(userRef, where("email", "==", result.user.email))
            recuperarDoc(q)

        }).catch((error) => {
            throw new Error(error)
        });

}

export const consultarDocumentoDatabase = async (nombreDatabase, id) => {
    try {
        
            const response = await getDoc(doc(userRef, id));
        const document = {
          id: response.id,
          ...response.data(),
      };
      // console.log(document);
      return document;
        
        
    } catch (error) {
    //   throw new Error(error.message);
    }
  };

onAuthStateChanged(auth, (user) => {

    if (user) {
      usuario = user
    } else {
      usuario = undefined
    }
  
  })


  export const logOutUsuario = async () => {
    try {
      const respuesta = await signOut(auth)
      console.log(respuesta);
      // console.log('Me sali...!');
    } catch (e) {
      throw new Error(e)
    }
  }