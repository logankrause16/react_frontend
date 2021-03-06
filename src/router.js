import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import App from './App';

const BasicExample = () => {
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/datagrid">Datagrid</Link>
        </li>
      </ul>
    </div>

    <Switch>
      <Route path='/'>
        <App />
      </Route>
      <Route path='/datagrid'></Route>
    </Switch>
  </Router>
}
