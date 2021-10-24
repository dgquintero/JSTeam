import Logo from 'media/logo.svg'
import { Link } from 'react-router-dom';
import SidebarLink from "components/SidebarLink";
import { consultarDocumentoDatabase, logOutUsuario, usuario } from './FirebaseInfo';
import { useState, useEffect } from 'react';
import { BsBoxArrowInLeft } from "react-icons/bs";


const Sidebar = () => {

    const [usuarioActivoRol, setUsuarioActivoRol] = useState("")
    const [usuarioActivoName, setUsuarioActivoName] = useState("")
    const [usuarioActivoPic, setUsuarioActivoPic] = useState("")

    const consultarUsuario = async (idUsuario) => {
       
        setUsuarioActivoPic(usuario.photoURL)
        const regUserAct = await consultarDocumentoDatabase('listaUsuarios', idUsuario)
        setUsuarioActivoRol(regUserAct.rol)
        setUsuarioActivoName(regUserAct.nombre)
        
        
    }
    

    useEffect(() => {
        consultarUsuario(usuario.uid)
    }, [])

   

    const handleClick = () => {
        logOutUsuario()
    }

  

    return (
        <>
            <div className="sidebar_container d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: 250 + 'px' }}>
                <Link to="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src={Logo} className="bi me-2" width="40" height="32" alt=""/>
                    <span className="fs-4">Company</span>
                </Link>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <SidebarLink nombre='Home' enlace='/home'></SidebarLink>
                    <SidebarLink nombre='Productos' enlace='/productos'></SidebarLink>
                    <SidebarLink nombre='Ventas' enlace='/ventas'></SidebarLink>
                    <SidebarLink nombre='Usuarios' enlace='/usuarios'></SidebarLink>
                </ul>
                <hr/>
                {/* Sidebar User */}
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                        id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={usuarioActivoPic} alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong className="text-wrap">{usuarioActivoName}</strong>                        
                    </Link>
                    <span className="fst-italic">({usuarioActivoRol})</span>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">                      
                      
                        <li><Link className="dropdown-item" to="/" onClick={handleClick} ><BsBoxArrowInLeft style={{ verticalAlign: 'sub' }}/>  Salir</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
