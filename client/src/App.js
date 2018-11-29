import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from "./components/Register";
import Login from "./components/Login";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
