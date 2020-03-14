import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, pink } from '@material-ui/core/colors';

import Contact from './components/Contact';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      main: '#ff1744'
    }
  }
});

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div>Home Page</div>
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
      </Switch>
    </Router>
  );
}
