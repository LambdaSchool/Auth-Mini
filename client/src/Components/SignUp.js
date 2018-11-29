import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  align-items: center;
  height: 100vh;
  justify-content: center;

  form {
    display: flex;
    flex-flow: column nowrap;
    width: 50%;
    justify-content: center;
    align-items: center;
    input {
      margin: 20px 0;
      width: 200px;
      height: 20px;
      text-align: center;
      border: 2px solid black;
    }

    input[type='submit'] {
      border: 2px solid black;
      width: 100px;
      height: 25px;
    }

    select {
      border: 2px solid black;
      width: 220px;
      height: 30px;
      margin: 50px 0;
    }
  }

  button {
    border: 2px solid black;
    width: 100px;
    height: 25px;
  }
`;

export default class SignUp extends Component {
  state = {};

  handleChange = e => {
    if (!e.target.name) {
      this.setState({
        department : e.target.value,
      });
    }
    else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/api/register', this.state)
      .then(res => {
        if (res.status === 201) {
          axios.post('http://localhost:3300/api/login', this.state).then(res => {
            const token = JSON.stringify(res.data.token);
            window.localStorage.setItem("token", token);
            this.props.history.push('/api/users');
          });
        }
        else {
          this.props.history.push('/unauthorized');
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <input name='username' type='text' placeholder='username' onChange={this.handleChange} />
          <input name='password' type='password' placeholder='password' onChange={this.handleChange} />
          <select id='dept-select' onChange={this.handleChange}>
            <option value=''>----Please choose a department----</option>
            <option value='Math'>Math</option>
            <option value='Science'>Science</option>
            <option value='Liberal Arts'>Liberal Arts</option>
            <option value='Physical Education'>Physical Education</option>
            <option value='Social Sciences'>Social Sciences</option>
            <option value='Art and Music'>Art and Music</option>
            <option value='Technology'>Technology</option>
            <option value='Business'>Business</option>
          </select>
          <input type='submit' value='submit' />
        </form>
        <button
          onClick={() => {
            this.props.history.push('/');
          }}>
          Back
        </button>
      </Container>
    );
  }
}
