import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import DataGrid from './features/datagrid/Datagrid';
import Map from './features/map/Map';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route exact path='/' component={App}></Route>
      <Route path='/datagrid' component={ DataGrid }></Route>
      <Route path='/map' component={ Map }></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
