import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Users from './users/Users.js';
import './App.css';

const Home = props => {
  return (<div>
    <h1>Home</h1>
  </div>)
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to='/' exact>
              Home
            </NavLink>
            {/* &nbsp; | &nbsp;
            <NavLink to='/signin'>
              Sign In
             </NavLink> */}
            &nbsp; | &nbsp;
            <NavLink to='/users'>
              Users
            </NavLink>
          </nav>
          <main>
            <Route path='/' component={Home} exact>

            </Route>
            {/* <Route path='/signin' component={Signin} exact>

            </Route> */}
            <Route path='/users' component={Users} exact>

            </Route>
          </main>
        </header>
      </div>
    );
  }
}

export default App;
