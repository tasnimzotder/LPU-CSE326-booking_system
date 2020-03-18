import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, pink } from '@material-ui/core/colors';

import Contact from './components/Contact';
import Halls from './components/Halls';

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
        <Route exact path='/' component={Halls} />
        {/* <Route path='/contact'>
          <Contact />
        </Route> */}
        <Route path='/contact' component={Contact} />
        {/* <Route path='/halls' component={Halls} /> */}
      </Switch>
    </Router>
  );
}
