import React, { Component } from 'react';
import './App.css';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import Nav from './Components/Nav';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const axios = require('axios').default

class App extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: false
    }

    this.handleLogin=this.handleLogin.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
  }

  handleLogin = () => {
    this.setState({
      loggedIn: true
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false
    })
    axios.delete('http://localhost:8080/openmrs/ws/rest/v1/session');
    
  }
  
  render(){
    
    return(
      <Router>
        <div className="App">
          <Nav handleLogout={this.handleLogout.bind(this)} data={this.state} />
          <Route exact path='/' render={(props) => (<LoginPage {...props} handleLogin={this.handleLogin} />)} />
          <Route path='/dashboard' component={Dashboard} />
        </div> 
      </Router>
    )
  } 
}

export default App;
