import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
// Metodos de interaccion con la base de datos
import {
  addDoc,
  collection,
  getDocs,
  query,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  where
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBkem1rUc3X3u8xqRW5UvN-0hT2GFHF0UE",
  authDomain: "lista-tareas-359fe.firebaseapp.com",
  projectId: "lista-tareas-359fe",
  storageBucket: "lista-tareas-359fe.appspot.com",
  messagingSenderId: "1015119479522",
  appId: "1:1015119479522:web:fe123c60c5f27241cf14bb",
  measurementId: "G-95MSE197PX"
};

initializeApp(firebaseConfig);
const database = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export let usuario;
let isReg = false;


// Guardar
export const guardarDatabase = async (nombreDatabase, data) => {
  try {

    const response = await addDoc(collection(database, nombreDatabase), data);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};



// Guardar con id
export const guardarDatabaseWithId = async (nombreDatabase, id, data) => {
  try {
    const response = await setDoc(doc(database, nombreDatabase, id), data);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Consultar todos los documentos (Coleccion)
export const consultarDatabase = async (nombreDatabase) => {
  try {
    const response = await getDocs(query(collection(database, nombreDatabase)));
    const elementos = response.docs.map((doc) => {
      const document = {
        id: doc.id,
        ...doc.data(),
      };
      return document;
    });
    console.log(elementos);
    return elementos;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Consultar un documento
export const consultarDocumentoDatabase = async (nombreDatabase, id) => {
  try {
    const response = await getDoc(doc(database, nombreDatabase, id));
    const document = {
      id: response.id,
      ...response.data(),
    };
    console.log(document);
    return document;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar un documento
export const actualizarDocumentoDatabase = async (nombreDatabase, id, data) => {
  try {
    const response = await updateDoc(doc(database, nombreDatabase, id), data);
    console.log(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar un documento
export const eliminarDocumentoDatabase = async (nombreDatabase, id) => {
  try {
    const response = await deleteDoc(doc(database, nombreDatabase, id));
    console.log(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// CrearUsuarios
export const crearUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await createUserWithEmailAndPassword(auth, email, password)
    console.log(credencialesUsuario);
    console.log(credencialesUsuario.user);
    console.log(credencialesUsuario.user.uid);
    const user = {
      id: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email
    }
    guardarDatabase('listaUsuarios', user)
    return user
  } catch (e) {
    throw new Error(e)
  }
}

//google
const recuperarDoc = async(q) =>{
try{
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    if(doc.id){
      isReg = true;
    }else{
      isReg = false;
    }
  });  

  console.log(isReg);

  if (isReg === false){
    const user = {
    id: usuario.uid,
    email: usuario.email, 
    name: usuario.displayName,
    rol: 3
  }
  guardarDatabaseWithId('listaUsuarios', usuario.uid, user)        
}
 

}catch(e){
  throw new Error(e)
}
}

export const signGoogle = async (result) => {

  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;      

      const userRef = collection(database, "listaUsuarios");
      const q = query(userRef, where("id", "==", result.user.uid))     
      recuperarDoc(q)         

    }).catch((error) => {
      throw new Error(error)
    });

}


// Login Usuarios
export const loginUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await signInWithEmailAndPassword(auth, email, password)
    // console.log(credencialesUsuario);
    // console.log(credencialesUsuario.user);
    // console.log(credencialesUsuario.user.uid);
    // const user = {
    //   id: credencialesUsuario.user.uid,
    //   email: credencialesUsuario.user.email
    // }
    // usuario = user

    return credencialesUsuario.user
  } catch (e) {
    throw new Error(e)
  }
}


// LogOut -> salir
export const logOutUsuario = async () => {
  try {
    const respuesta = await signOut(auth)
    console.log(respuesta);
    // console.log('Me sali...!');
  } catch (e) {
    throw new Error(e)
  }
}

//  datos usuario
export const datosUsuario = async () => {
  try {
    const user = auth.currentUser
    console.log(user);

    if (user) {
      console.log(user);
      return user
    } else {
      console.log('datos usuario:', user);
      return undefined
    }

  } catch (e) {
    throw new Error(e)
  }
}


// el.addEventListener('click', function)
// Usuario Activo
onAuthStateChanged(auth, (user) => {

  if (user) {
    usuario = user
  } else {
    usuario = undefined
  }

})