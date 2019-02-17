import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { ConnectedRouter } from 'react-router-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import { Route } from 'react-router';
// import { Switch } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';

import { DashboardView, MaintainanceView, OwnershipView, ClaimsView } from './views';

import './index.css';

let target = document.getElementById('root');

render(
   <Provider store={store}>
     <Router>
        <App>
          <Route exact path="/" component={DashboardView} />
          <Route exact path="/services" component={MaintainanceView} />
          <Route exact path="/ownership" component={OwnershipView} />
          <Route exact path="/claims" component={ClaimsView} />


          {/*<Switch>
            <Route path="/projects/new" component={ProjectForm} />
            <Route path="/projects/:id/edit" exact component={ProjectForm} />
            <Route path="/projects/:id" exact component={Project} />
          </Switch>*/}


          {/* Admin */}
          {/*<Route path="/admin" exact component={Admin}/>
          <ProtectedRoute path="/admin/scopes" exact component={ScopesList}/>
          <Switch>
            <ProtectedRoute path="/admin/scopes/new" component={ScopeForm} />
            <ProtectedRoute path="/admin/scopes/:id" component={ScopeForm} />
          </Switch>

          <ProtectedRoute path="/admin/requirements" exact component={RequirementList}/>
          <Switch>
            <ProtectedRoute path="/admin/requirements/new" exact component={RequirementEdit}/>
            <ProtectedRoute path="/admin/requirements/:id" exact component={RequirementEdit}/>
          </Switch> */}
        </App>
    </Router>
    </Provider>,
    target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// registerServiceWorker();
