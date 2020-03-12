import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import DataGrid from './features/datagrid/Datagrid';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App}></Route>
      <Route path='/datagrid' component={ DataGrid }></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
