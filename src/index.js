import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DataGrid from './features/datagrid/Datagrid';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={ App } />
      <Route path='/datagrid' component={ DataGrid } />
    </Switch>
  </Router>,
  document.getElementById('root')
);
