

import "styles/sidebars.css"
import "styles/bootstrap.min.css"
import "styles/styles.css"

import Usuarios from "./Usuarios"
import PrivateLayout from "layouts/PrivateLayout"


const Home = () => {
    return (
        <div>        
        <PrivateLayout>
        <Usuarios/>
        </PrivateLayout>
        </div>
)
    
}

export default Home
