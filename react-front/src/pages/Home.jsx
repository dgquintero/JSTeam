

import "styles/sidebars.css"
import "styles/bootstrap.min.css"
import "styles/styles.css"


import PrivateLayout from "layouts/PrivateLayout"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { Principal } from "./Principal"
import Productos from "./Productos"
import Ventas from "./Ventas"
import Usuarios from "./Usuarios"


const Home = () => {
    return (
        <div>        
        
        <Router>
        <PrivateLayout>
            <Switch>
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
