import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/users' component={UserList} />
          <Redirect to='/users' />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
