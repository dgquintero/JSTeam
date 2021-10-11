import Logo from '../logo.svg'

const SidebarTop = () => {
    return (
        <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <img src={Logo} className="bi me-2" width="40" height="32" alt="" />
                <span className="fs-4">Company</span>
        </a>
    )
}

export default SidebarTop
