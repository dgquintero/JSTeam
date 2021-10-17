import { logOutUsuario } from 'config/firebase'
import React from 'react'
// import { Link } from 'react-router-dom'

export const Home = () => {

    const handleClick = async(e) => {
        e.preventDefault()
        
            
        logOutUsuario()
        // history.push('/pageAd')      


    }

    return (
        <div className="container">
            <h1 className="text-center mt-5">Página principal</h1>
            <div className="container-flex">
                {/* <Link 
                className="btn btn-primary  position-absolute top-50 start-50 translate-middle mt-1"
                to = "/Login"
                >login</Link> */}
                <button 
                    className="w-100 btn btn-danger" 
                    id="googleBtn" 
                    onClick = {handleClick}
                    >Salir</button>
            </div>

        </div>
    )
}
