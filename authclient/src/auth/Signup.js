import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    department: '',
  }
  render() {
    return (

       <form onSubmit = {this.handleSubmit}>
            <div>
                <label htmlFor="username">Username
                    <input 
                    type = "text"
                    name = "username"
                    placeholder = "username"
                    onChange = {this.changeHandler}
                    value = {this.state.username}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="password">Password
                    <input 
                    type = "password"
                    name = "password"
                    placeholder = "password"
                    onChange = {this.changeHandler}
                    value = {this.state.password}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="department">Department
                    <input 
                    type = "text"
                    name = "department"
                    placeholder = "department"
                    onChange = {this.changeHandler}
                    value = {this.state.department}
                    />
                </label>
            </div>
            <div>
                <button type = "submit">Register</button>
            </div>

       </form>
    );
  }

  changeHandler = (event) => {
    console.log(event.target.name);
    this.setState({ 
      ...this.state,
      [event.target.name]: event.target.value
     })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = 'http://localhost:7777/api/register';
    console.log(this.state)
    axios.post(endpoint, this.state)
    .then(res => {
      console.log(res.data);
      localStorage.setItem('jwt', res.data.token);
      this.setState({ state: res.data })

    }).catch(err => {
      console.error('ERROR', err)
    })
  }
}

export default Signup;