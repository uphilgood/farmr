import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// pick a date util library
import MomentUtils from '@date-io/moment';
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const App = () => {


const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});
  return (
    <ThemeProvider theme={darkTheme}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
  </MuiPickersUtilsProvider>
  </ThemeProvider>
  )
}

export default App;