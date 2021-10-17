import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import Login from 'pages/Login';
import Home from 'pages/admin/Home';
import Productos from 'pages/admin/Productos';
import Ventas from 'pages/admin/Ventas'
import Usuarios from 'pages/admin/Usuarios';
import VentasVendedor from 'pages/user/VentasVendedor';
import HomeVendedor from 'pages/user/HomeVendedor';

import "styles/sidebars.css"
import "styles/bootstrap.min.css"
import "styles/styles.css"


function App() {
  return (
    <>
    
      <Router>
        <Switch>

          <Route exact path='/'>
            <Login />
          </Route>

          <Route path={['/admin', '/admin/productos', '/admin/ventas', '/admin/usuarios']}>
            <PrivateLayout>
              <Switch>
                <Route path='/admin/productos'>
                  <Productos />
                </Route>
                <Route path='/admin/ventas'>
                  <Ventas />
                </Route>
                <Route path='/admin/usuarios'>
                  <Usuarios />
                </Route>
                <Route path='/admin'>
                  <Home />
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>

          <Route path={['/vendedor', '/vendedor/ventas']}>
            <PublicLayout>
              <Switch>
                <Route path='/vendedor/ventas'>
                  <VentasVendedor />
                </Route>
                <Route path='/vendedor'>
                  <HomeVendedor />
                </Route>
              </Switch>
            </PublicLayout>
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
