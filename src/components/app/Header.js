import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../../services/auth';

class Header extends Component {

  state = {
    userIsAuthenticated: false
  }

  componentDidMount() {
    let userIsAuthenticated = AuthService.isAuthenticated();
    this.setState({
      userIsAuthenticated
    });
  }

  render() {
    let url = this.state.userIsAuthenticated ? '/' : 'http://schanelyphotography.com';
    let logout = this.state.userIsAuthenticated ? <Link to={'/logout'} className="link--logout">Log out</Link> : '';
    return (
      <header>
        <h1>
          <Link to={url}>Photo Forms</Link>
        </h1>
        {logout}
      </header>
    );
  }
}

export default Header;
