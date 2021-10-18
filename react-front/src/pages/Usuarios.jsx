import { consultarDatabase } from 'config/firebase'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Usuarios = () => {

     const [listaUsuarios, setListaUsuarios] = useState([])

    const cargarUsuarios = async () => {      
        const listaTemporal = await consultarDatabase('listaUsuarios')
        // console.log(listaTemporal);
        setListaUsuarios(listaTemporal)
    }

    useEffect(() => {
        cargarUsuarios()
    }, [])

    

    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Usuarios</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores!</p>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1" onClick={cargarUsuarios}>Buscar/Modificar Usuarios</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2" onClick={cargarUsuarios}>Mostrar Usuarios Registrados</a>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="tab1">
                        <form className="d-flex mt-2" id="searchForm">
                            <input className="form-control me-sm-2" type="text" placeholder="Search Email Address" id="searchValue" />
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <hr/>
                        <div className="mt-5 h4">
                            Search Result
                        </div>
                        <hr/>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="searchByResult">    

                            {
                                    listaUsuarios.map((usuario, index) => (
                                        <tr key={usuario.id}>                                           
                                            <td>{usuario.email}</td>
                                            <td>{usuario.name}</td>
                                            <td>{""}</td>
                                            <td>{parseInt(usuario.rol) === 1 ? "Admin" : 
                                                 parseInt(usuario.rol) === 2 ? "Vendedor" :
                                                 "Usuario"}</td>
                                            <td>
                                                <Link className="btn btn-outline-primary btn-sm"
                                                    to={`/add-delete-usuarios/${usuario.id}`}>
                                                    Editar
                                                </Link>

                                            </td>
                                        </tr>
                                    ))
                                }  

                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="tab2">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Rol</th>
                                </tr>
                            </thead>
                            <tbody id="searchResult"> 

                            {
                                    listaUsuarios.map((usuario, index) => (
                                        <tr key={usuario.id}>                                           
                                            <td>{usuario.email}</td>
                                            <td>{usuario.name}</td>
                                            <td>{""}</td>
                                            <td>{parseInt(usuario.rol) === 1 ? "Admin" : 
                                                 parseInt(usuario.rol) === 2 ? "Vendedor" :
                                                 "Usuario"}</td>
                                       
                                        </tr>
                                    ))
                                }                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuarios
