import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5">Página principal</h1>
            <div className="container-flex">
                <Link 
                className="btn btn-primary  position-absolute top-50 start-50 translate-middle mt-1"
                to = "/Login"
                >login</Link>
            </div>

        </div>
    )
}
