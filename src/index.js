import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
<<<<<<< HEAD
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
=======
>>>>>>> 0baa6c14306f37840436575417042e2b523252a9
import DataGrid from './features/datagrid/Datagrid';

ReactDOM.render(
  <Router>
    <Switch>
<<<<<<< HEAD
      <Route exact path='/' component={ App } />
      <Route path='/datagrid' component={ DataGrid } />
=======
      <Route exact path='/' component={App}></Route>
      <Route path='/datagrid' component={ DataGrid }></Route>
>>>>>>> 0baa6c14306f37840436575417042e2b523252a9
    </Switch>
  </Router>,
  document.getElementById('root')
);
