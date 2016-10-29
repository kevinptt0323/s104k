import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll';

import App from './App';
import Login from './pages/Login';

require('react-tap-event-plugin')();
require('normalize-css');


const Routes = (props, context) => {
  const { store } = context;
  const historyStore = syncHistoryWithStore(hashHistory, store);
  const auth = {
    loginRequired: (nextState, replace) => {
      if (!store.getState().auth.token) {
        replace('/login');
      }
    }
  };
  return (
    <Router onUpdate={fireTracking} history={historyStore} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={App}>
        <IndexRedirect to="/search" />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  );
};

Routes.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Routes;
