import Logo from 'media/logo.svg'
import { Link } from 'react-router-dom';
import SidebarLink from "components/SidebarLink";
import { consultarDocumentoDatabase } from 'config/firebase';
import { usuario } from 'config/firebase';
import { useState, useEffect } from 'react';
import { logOutUsuario } from 'config/firebase';



const Sidebar = () => {

    const [usuarioActivoRol, setUsuarioActivoRol] = useState("")
    const [usuarioActivoName, setUsuarioActivoName] = useState("")
    const [usuarioActivoPic, setUsuarioActivoPic] = useState("")
            
    
    const consultarUsuario = async (idUsuario) =>{
        const regUserAct = await consultarDocumentoDatabase('listaUsuarios',idUsuario)
        
        setUsuarioActivoRol(regUserAct.rol)
        setUsuarioActivoName(regUserAct.name)        
        setUsuarioActivoPic(usuario.photoURL)
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
                    <SidebarLink nombre='Home' enlace='/admin/home'></SidebarLink>
                    {
                        usuarioActivoRol === 1 ? <SidebarLink nombre='Productos' enlace='/admin/productos'></SidebarLink> : ''                    
                    }

                    {
                        usuarioActivoRol !== 3 ? <SidebarLink nombre='Ventas' enlace='/admin/ventas'></SidebarLink> : '' 
                    }                    
                    
                    {
                         usuarioActivoRol === 1 ? <SidebarLink nombre='Usuarios' enlace='/admin/usuarios'></SidebarLink> : ''
                    }
                    
                </ul>
                <hr/>
                {/* Sidebar User */}
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                        id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={usuarioActivoPic} alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>{usuarioActivoName}</strong>
                        <span className="fst-italic">({usuarioActivoRol})</span>
                    </Link>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><button className="dropdown-item" onClick = {handleClick} >Salir</button></li>
                    </ul>
                </div>
            </div>
            
        </>
    )
}

export default Sidebar
