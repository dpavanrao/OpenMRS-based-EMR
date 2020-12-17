import React, { Component } from 'react';
import './Global.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';

class Nav extends Component {
    
    render() {
        let renderLogo;
        if(this.props.data.loggedIn){ 
            renderLogo = <Link to='/dashboard'><img alt="logo" className="Logo" src={logo} style={{textAlign: "left"}}/></Link>;
            console.log('login button area crossed');
        } else{
            renderLogo = <Link to='/'><img alt="logo" className="Logo" src={logo} style={{textAlign: "left"}}/></Link>
        }
        console.log(this.props.data)

        return (
            <div className="Nav">
                {renderLogo}
                
                {this.props.data.loggedIn && <Link to='/'><button className="LogoutButton" onClick={this.props.handleLogout}>Logout</button></Link>}
            </div>
        )
    }
}

export default Nav

