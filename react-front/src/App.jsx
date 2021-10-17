import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import "styles/sidebars.css"
import "styles/bootstrap.min.css"
import "styles/styles.css"
// import Sidebar from 'components/Sidebar';
import Login from 'pages/Login';
import { Home } from 'pages/Home';





function App() {
  return (
    <>    
      <Router>
        <Switch>
          <Route exact path = "/login" component ={Login} />
          
          <Route exact path = "/" component = {Home} />          
        </Switch>
        
      </Router>   
    </>
  );
}

export default App;
