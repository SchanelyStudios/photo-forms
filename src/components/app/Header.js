import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserModel } from '../../models/user.model';

class Header extends Component {

  userIsAuthenticated = UserModel.isAuthenticated();

  render() {
    let url = this.userIsAuthenticated ? '/' : 'http://schanelyphotography.com';
    return (
      <header>
        <h1>
          <Link to={url}>Photo Forms</Link>
        </h1>
      </header>
    );
  }
}

export default Header;
