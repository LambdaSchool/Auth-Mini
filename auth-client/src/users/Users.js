import React from 'react'
import axios from 'axios'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    const endpoint = `${process.env.API_URL}/api/users`
    try {
      const token = localStorage.getItem('jwt')
      const requestOptions = {
        headers: {
          authorization: token
        }
      }
      const response = axios.get(endpoint, requestOptions)
      this.setState({users: response.data.users})
    } catch (error) {
      console.log('Coulnd\'t get users')
    }
  }
  

  render() { 
    return (
      <div>
        <h2>
          <ul>
            {this.state.users.map(user => (
              <li key={user.id}>{user.username} - {user.department}</li>
            )}
          </ul>
        </h2>
      </div>
    );
  }
}

export default Users;