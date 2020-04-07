import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './styles.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, pink } from '@material-ui/core/colors';

import Contact from './components/Contact';
import Halls from './components/Halls';
import Test from './components/Test';
import Admin from './components/admin/Admin';
import Header from './components/Header';

import AdminProfile from './components/admin/AdminProfile';
import AdminContacts from './components/admin/AdminContacts';
import AdminBookings from './components/admin/AdminBookings';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      main: '#ff1744',
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route exact path='/' component={Halls} />
        <Route path='/contact' component={Contact} />
        <Route path='/test' component={Test} />
        <Route exact path='/admin' component={AdminProfile} />
        <Route exact path='/admin/contacts' component={AdminContacts} />
        <Route exact path='/admin/bookings' component={AdminBookings} />
      </Switch>
    </BrowserRouter>
  );
}
