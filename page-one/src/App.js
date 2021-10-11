import React, { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import './App.css';
import db from './firebase/firebaseConfig'
import { ModuloProductos } from './components/ModuloProductos';
// import { Login } from './components/Login';



function App() {

  useEffect(()=>{
    const obtenerDatos = async()=>{
      const datos = await getDocs(collection(db,'ventas'));
      datos.forEach((documento)=>{
        console.log(documento.data());
      })
      // console.log(datos.docs[0].data());
    }

    obtenerDatos();
    
  }, [])


  return (
      <div className = "App container mt-5">        
        
      <ModuloProductos/>

      </div>
  );
}

export default App;
