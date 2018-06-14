import React, { Component } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Signin from "./auth/Signin.js";
import Signup from "./auth/Signup.js";
import Users from "./users/Users.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
