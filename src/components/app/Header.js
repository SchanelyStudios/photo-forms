import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserModel } from '../../models/user.model';

class Header extends Component {

  userIsAuthenticated = UserModel.isAuthenticated();

  render() {
    let url = this.userIsAuthenticated ? '/' : 'http://schanelyphotography.com';
    let logout = this.userIsAuthenticated ? <Link to={'/logout'}>Log out</Link> : '';
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
