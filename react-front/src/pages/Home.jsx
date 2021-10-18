

import "styles/sidebars.css"
import "styles/bootstrap.min.css"
import "styles/styles.css"


import PrivateLayout from "layouts/PrivateLayout"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { Principal } from "./Principal"
import Productos from "./Productos"
import Ventas from "./Ventas"
import Usuarios from "./Usuarios"
import { AddDeleteProduct } from "components/AddDeleteProduct"
import { AddDeleteVentas } from "components/AddDeleteVentas"
import { AddDeleteUser } from "components/AddDeleteUser"


const Home = () => {
    return (
        <div>        
        
        <Router>
        <PrivateLayout>
            <Switch>
                <Route exact path="/add-delete-usuarios/:id" component={AddDeleteUser} />
                <Route exact path="/add-delete-ventas/:id" component={AddDeleteVentas} />
                <Route exact path="/add-delete-productos/:id" component={AddDeleteProduct} />
                <Route  path="/productos" component={Productos}/>
                <Route  path="/ventas" component={Ventas}/>
                <Route  path="/usuarios" component={Usuarios}/>
                <Route  path="/" component={Principal}/>                
            </Switch>
        </PrivateLayout>
        </Router>
        
        </div>
)
    
}

export default Home
