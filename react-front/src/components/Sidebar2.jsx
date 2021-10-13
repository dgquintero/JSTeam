import Logo from 'media/logo.svg'
import FotoPerfil from 'media/pp2.jpg'
import { Link } from 'react-router-dom';
import SidebarLink from "components/SidebarLink";


const Sidebar = () => {
    return (
        <>
            <div className="sidebar_container d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: 250 + 'px' }}>
                <Link to="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src={Logo} className="bi me-2" width="40" height="32" alt=""/>
                    <span className="fs-4">Company</span>
                </Link>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <SidebarLink nombre='Home' enlace='/vendedor'></SidebarLink>
                    <SidebarLink nombre='Ventas' enlace='/vendedor/ventas'></SidebarLink>
                </ul>
                <hr/>
                {/* Sidebar User */}
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                        id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={FotoPerfil} alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>Usuario</strong>
                        <span className="fst-italic">(Rol)</span>
                    </Link>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><Link className="dropdown-item" to="#">Perfil</Link></li>
                        <li><Link className="dropdown-item" to="#">Configuración</Link></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><Link className="dropdown-item" to="/">Salir</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
