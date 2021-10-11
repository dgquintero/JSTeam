import SidebarUser from "./SidebarUser"
import SidebarLinks from "./SidebarLinks"
import SidebarTop from "./SidebarTop"

import "../sidebars.css"
import "../bootstrap.min.css"
import "../styles.css"


const Sidebar = () => {
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: 250 + 'px' }}>
                <SidebarTop />
                <hr />
                <SidebarLinks />
                <hr />
                <SidebarUser />
            </div>
            {/* Div Bar */}
            <div className="b-example-divider"></div>
        </>
    )
}

export default Sidebar
