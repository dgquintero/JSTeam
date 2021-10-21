import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from 'pages/Login';

import 'react-toastify/dist/ReactToastify.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

import "styles/sidebars.css"
import "styles/bootstrap.min.css"
import "styles/styles.css"
import { HomeGeneral } from 'pages/HomeGeneral';





function App() {

  const [isUserSignedIn, setIsuserSignedIn] = useState(false);
  const auth = getAuth();


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsuserSignedIn(true);
      // const userLista = consultarDocumentoDatabase("usuarios",user.uid)
      // setUserRol(userLista)
    } else {
      setIsuserSignedIn(false);
    }
  });





  if (isUserSignedIn) {
    return (
      <>
      <Router>
          <Switch>
            <Route path="/" component={HomeGeneral} />
          </Switch>
        </Router>
      </>
    );
  }
  else {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </>
    );
  }



}

export default App;
