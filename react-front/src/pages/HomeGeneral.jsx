import React, { useState, useEffect } from 'react'
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import Home from 'pages/admin/Home';
import Productos from 'pages/admin/Productos';
import Ventas from 'pages/admin/Ventas'
import Usuarios from 'pages/admin/Usuarios';
// import VentasVendedor from 'pages/user/VentasVendedor';
import HomeVendedor from 'pages/user/HomeVendedor';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'pages/Login';
import { consultarDocumentoDatabase } from 'components/FirebaseInfo';
import { usuario } from 'components/FirebaseInfo';
import { Mensaje } from './Mensaje';


export const HomeGeneral = () => {


    const [usuarioRol, setUsuarioRol] = useState("")
    const [usuarioEstado, setusuarioEstado] = useState("")

    const cargarUsuarios = async () => {
        const listaTemporal = await consultarDocumentoDatabase('usuarios', usuario.uid)
        setusuarioEstado(listaTemporal.estado)
        setUsuarioRol(listaTemporal.rol)
    }

     console.log(usuarioRol);
     console.log(usuarioEstado);

    useEffect(() => {
        cargarUsuarios()
    }, [])

    return (
        <div>
            <Router>
                <Switch>
                    {

                        usuarioRol === "Administrador" && usuarioEstado === "Autorizado"
                            ?
                            <Route path={['/', '/productos', '/ventas', '/usuarios']}>
                                <PrivateLayout>
                                    <Switch>
                                        <Route path='/productos'>
                                            <Productos />
                                        </Route>
                                        <Route path='/ventas'>
                                            <Ventas />
                                        </Route>
                                        <Route path='/usuarios'>
                                            <Usuarios />
                                        </Route>
                                        <Route path='/'>
                                            <Home />
                                        </Route>
                                    </Switch>
                                </PrivateLayout>
                            </Route>
                            :
                            usuarioRol === "Vendedor" && usuarioEstado === "Autorizado"
                                ?
                                <Route path={['/', '/ventas']}>
                                    <PublicLayout>
                                        <Switch>
                                            <Route path='/ventas'>
                                                <Ventas />
                                            </Route>
                                            <Route path='/'>
                                                <HomeVendedor />
                                            </Route>
                                        </Switch>
                                    </PublicLayout>
                                </Route>
                                :
                                usuarioEstado === "Pendiente" || usuarioEstado === "No Autorizado"
                                    ?
                                    <Router>
                                        <Switch>
                                            <Route path="/" component={Mensaje} />                                            
                                        </Switch>
                                    </Router>
                                    : <Router>
                                        <Switch>
                                            <Route path="/" component={Login} />
                                        </Switch>
                                    </Router>
                    }
                </Switch>
                <ToastContainer autoClose={5000} />
            </Router>

        </div>
    )
}
