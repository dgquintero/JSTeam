import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "styles/sidebars.css";
import "styles/bootstrap.min.css";
import "styles/styles.css";
// import Sidebar from 'components/Sidebar';
import Login from "pages/Login";

// import Productos from 'pages/admin/Productos';
import { useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "pages/Home";

function App() {
  const [isUserSignedIn, setIsuserSignedIn] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsuserSignedIn(true);
    } else {
      setIsuserSignedIn(false);
    }
  });

  if (isUserSignedIn) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </>
    );
  } else {
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
