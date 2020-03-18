import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Features
import App from './App';
import Map from './features/components/map/Map';
import Constraints from './features/components/constraints/Constraints';
import Navbar from './features/shared/navbar/Navbar'

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <div>
    <Navbar />
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={ App }></Route>
        <Route path='/map' component={ Map }></Route>
        <Route path='/constraints' component={ Constraints }></Route>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);
