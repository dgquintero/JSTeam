import React from 'react';


export const Login = () => {
    return (
        <div className="float-center text-center m-5 bg-Light shadow rounded">
            <form className="form-signin" >

                <h1 className="h3 mb-3 fw-normal">Ingreso al Sistema de Informacion</h1>
                <div className="alert alert-success show fade d-none" id="sucAlert">
                    <span>Ok! Contacte el administrador para habilitar su cuenta!</span>
                </div>

                <div className="form-floating m-3">            
                    <input type="text" 
                    className="form-control" 
                    placeholder="" 
                    required 
                    />
                    <label for="name">Nombre</label>
                </div>

                <div className="form-floating m-3">
                    <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="" 
                    required 
                    />
                    <label for="name">Email</label>
                </div>

                <button className="col-10 btn btn-primary btn-sm mb-3" type="submit" id="signUp">Registrarse</button>
                <button className="col-10 btn btn-danger btn-sm" type="button" id="googleBtn">Ingresar con Google</button>

                <p className="mt-5 mb-3 text-muted">&copy; 2021</p>

            </form>
        </div>
    )
}
