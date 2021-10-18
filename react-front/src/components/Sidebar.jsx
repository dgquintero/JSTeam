import Logo from 'media/logo.svg'
import { Link } from 'react-router-dom';
import SidebarLink from "components/SidebarLink";
import { consultarDocumentoDatabase } from 'config/firebase';
import { usuario } from 'config/firebase';
import { useState, useEffect } from 'react';
import { logOutUsuario } from 'config/firebase';
import { Loading } from './Loading';
import { useHistory } from 'react-router-dom'



const Sidebar = () => {

    const [usuarioActivoRol, setUsuarioActivoRol] = useState("")
    const [usuarioActivoName, setUsuarioActivoName] = useState("")
    const [usuarioActivoPic, setUsuarioActivoPic] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const consultarUsuario = async (idUsuario) => {
        setLoading(true)
        setUsuarioActivoPic(usuario.photoURL)
        const regUserAct = await consultarDocumentoDatabase('listaUsuarios', idUsuario)
        setUsuarioActivoRol(regUserAct.rol)
        setUsuarioActivoName(regUserAct.name)
        setLoading(false)
    }

    useEffect(() => {

        consultarUsuario(usuario.uid)

    }, [])


    const handleClick = () => {
        logOutUsuario()
        history.push('/')
    }

    return (
        <>  {
            loading
                ?
                <div className="sidebar_container d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: 250 + 'px' }}>
                    <Loading />
                </div>
                :
                <div className="sidebar_container d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: 250 + 'px' }}>
                    <Link to="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <img src={Logo} className="bi me-2" width="40" height="32" alt="" />
                        <span className="fs-4">Company</span>
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <SidebarLink nombre='Home' enlace='/'></SidebarLink>
                        {
                            parseInt(usuarioActivoRol) === 1 ? <SidebarLink nombre='Productos' enlace='/productos'></SidebarLink> : ''
                        }

                        {
                            parseInt(usuarioActivoRol) !== 3 ? <SidebarLink nombre='Ventas' enlace='/ventas'></SidebarLink> : ''
                        }

                        {
                            parseInt(usuarioActivoRol) === 1 ? <SidebarLink nombre='Usuarios' enlace='/usuarios' ></SidebarLink> : ''
                        }

                    </ul>
                    <hr />
                    {/* Sidebar User */}
                    <div className="dropdown">
                        <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                            id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={usuarioActivoPic} alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>{usuarioActivoName}</strong>
                            <span className="fst-italic">
                                ({  parseInt(usuarioActivoRol) === 1 ? "Admin" :
                                    parseInt(usuarioActivoRol) === 2 ? "Vendedor" :
                                    "Usuario"})
                                    </span>
                        </Link>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                            <li><button className="dropdown-item" onClick={handleClick} >Salir</button></li>
                        </ul>
                    </div>
                </div>
        }
        </>
    )
}

export default Sidebar
