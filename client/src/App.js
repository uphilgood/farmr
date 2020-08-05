import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const App = () => {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

export default App;