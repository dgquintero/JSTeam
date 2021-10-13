import { Link } from 'react-router-dom';

const SidebarLink = ({enlace, nombre}) => {
    return (
        // TO DO add active link function
        <li>
            <Link to={enlace} className="nav-link link-dark">
                {nombre}
            </Link>
        </li>
    )
}

export default SidebarLink
