import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Signin from './auth/Signin.js';
import Users from './users/Users.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>

          <div>
          {localStorage.getItem('jwt') && (
            <button onClick={this.signout}>Signout</button>
          )}
          </div>
        </header>
        
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
      </div>
    );
  }

  signout = () => {
    if(localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
    }
  };
}

export default withRouter(App);
