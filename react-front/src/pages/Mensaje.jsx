import { usuario } from 'components/FirebaseInfo'
import { logOutUsuario } from 'components/FirebaseInfo'
import { consultarDocumentoDatabase } from 'components/FirebaseInfo'
import React, { useState, useEffect } from 'react'


export const Mensaje = () => {


    const [usuarioEstado, setusuarioEstado] = useState("")

    const cargarUsuarios = async () => {
        const listaTemporal = await consultarDocumentoDatabase('usuarios', usuario.uid)
        setusuarioEstado(listaTemporal.estado)
       
    }

    console.log(usuarioEstado);

    useEffect(() => {
        cargarUsuarios()
    }, [])
    
    const handleClick = () => {
        logOutUsuario()
    }

    return (
        <div className = "container m-5 ">
            <h1> <p>El estado de su cuenta es: </p>  {usuarioEstado} </h1>

            <button className="btn btn-primary" onClick={handleClick} >Salir</button>
        </div>
    )
}
