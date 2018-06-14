import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state ={
      username:'',
      password:'',
  };

render() {
  return (
    <form>
      <div>
	<label>Username</label>
	<input
	  value={this.state.username}
	  onChange={this.handleChange}
	  name='username'
	  type='text'/>
      </div>
      <div>
	<label>Password</label>
	<input
	  value={this.state.password}
	  onChange={this.handleChange}
	  name="password"
	  type="password"
	  />
      </div>
      <div>
	<button onClick={this.handleSubmitSignin}>Login</button>
      </div>
      
    </form>
  );
}


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
};

  
handleSubmitSignin = (event) => {
  event.preventDefault();
    axios
    .post('http://localhost:5500/api/auth/login', this.state)
    .then(response => {
      localStorage.setItem('jwt', response.data.token);
      this.props.history.push('/users');
    })
    .catch(err => console.log(err));
};

}


export default Signin;
