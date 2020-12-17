import React, { Component } from 'react';
const axios = require('axios').default

class LoginPage extends Component {
    
  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      auth: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
    
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(event, handleLogin) {
    console.log(handleLogin, "abc");
    event.preventDefault();
      
    let res = await axios.get('http://localhost:8080/openmrs/ws/rest/v1/session', {
        auth: {
          username: `${this.state.username}`,
          password: `${this.state.password}`
    }})
    let data = res.data;
    if(data.authenticated === true){
      console.log('Successful log-in');
      this.props.handleLogin();
      const encodedString = new Buffer(`${this.state.username}:${this.state.password}`).toString('base64')
      
      this.setState({
        auth: `Basic ${encodedString}`
      })
      console.log(this.state.auth)
      this.props.history.push("/dashboard", {roles: data.user.roles, privileges: data.user.privileges,
         auth: this.state.auth, username: this.state.username, password: this.state.password});
    }
    else{
      console.log('failed log-in attempt');
      alert("Invalid credentials. Please try again");
    } 
  } 
  render() {

    return (
      <>
      <div style={{backgroundColor: "#34421E"}}>
      <br/>
      <h1 style={{fontSize: 30, color: "#f1f1ef" }}>Log In</h1>
        <form>
          
            <input 
              className="Box"
              placeholder="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="Box" 
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
          
          <br />
          <input 
            type="submit"
            className="submitButton" 
            value="Submit"  
            onClick={(event) => this.handleSubmit(event, this.props.handleLogin)}
          />
        </form>
        <br />
        <br />
      </div>
      </>
    )
  }
}

export default LoginPage
