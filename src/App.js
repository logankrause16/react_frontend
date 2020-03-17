import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './features/components/login/Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Logans React App (Not yours)</h2>
        </div>
        <Login />
      </div>
    );
  }
}

export default App;