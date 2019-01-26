import React, { Component } from 'react';
import './App.css';
import {Route, withRouter, NavLink} from 'react-router-dom';
import styled from 'styled-components';

import Login from './Components/login';
import Register from './Components/register';
import Users from './Components/users';

const HeaderDiv = styled.div `
position:relative;
z-index:4;
background:white;
top:3;
padding-top:5px;
padding-bottom:20px;
text-align: center;
`

const Home = props =>{
  return(
    <HeaderDiv>
      <h1>
        Welcome to Client Authentication.
      </h1>
      <NavLink to='/login'>Login</NavLink>
      &nbsp;&nbsp;
      <NavLink to='/register' >Register</NavLink>
      &nbsp;&nbsp;
      <NavLink to='/users'>Users</NavLink>
    </HeaderDiv>
  )
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Home/>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
