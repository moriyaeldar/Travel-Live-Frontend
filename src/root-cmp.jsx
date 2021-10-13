import React from 'react';

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router';

import routes from './routes';

import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';
import { UserDetails } from './pages/UserDetails.jsx';

export class RootCmp extends React.Component {
  render() {
    return (
      <div className="RootCmp">
        <AppHeader />
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
            {/* <Route path="/user/:id" component={UserDetails} /> */}
          </Switch>
        </main>
        <AppFooter />
      </div>
    );
  }
}
