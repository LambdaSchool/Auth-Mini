import React, { Component } from 'react';
import axios from 'axios';


class Signup extends Component {
    state = {
        username: '',
        password: '',
        department:''
    };
  render() {
    return (
      <form onSubmit={this.register}>
          <div>
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div>
            <label>Department</label>
              <input
              name="department"
              value={this.state.department}
              onChange={this.handleChange}
              type="text"
              />
          </div>
          <div>
            <button type = "submit">Submit</button>
          </div>
      </form>
    );
  }
  handleChange = event => {
      const { name , value } = event.target;

      this.setState({ [name]: value });
  };
  register = event => {
      event.preventDefault();

      axios.post('http://localhost:1234/api/register', this.state)
      .then( res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
       })
      .catch(err => {
          console.err(err);
      })
    
  };
}

export default Signup;
