import React from 'react';
import shoe from './images/shoes.svg';

export const Login = () => {
    return (
        <div>
            <form className = "form-signin" >
                <img className ="mb.4" src ={shoe} alt ="zapato"/>
                <h1 className="h3 mb-3 fw-normal">Ingreso al Sistema de Informacion</h1>

            </form>
        </div>
    )
}
