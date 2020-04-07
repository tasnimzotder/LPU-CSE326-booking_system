import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import AdminHeader from './AdminHeader';
import AdminProfile from './AdminProfile';
import AdminContacts from './AdminContacts';

export default function Admin() {
  return (
    <div style={{ marginTop: 66 }}>
      {/* <BrowserRouter>
        <AdminHeader />
        <AdminContacts />
        <Switch>
          <Route  path='/' component={AdminProfile} />
          <Route  path='contacts' component={AdminContacts} />
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}
