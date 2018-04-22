import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiAuthConfig, UserModel } from '../models/user.model';

import { Redirect } from 'react-router-dom';

class LoginPage extends Component {

  componentDidMount() {
    UserModel.getAuthenticated();
    this.isUserAuthenticated = UserModel.isAuthenticated();
  }

  render() {
    if (this.userIsAuthenticated) {
      return (
        <Redirect to={'/'} />
      );
    }

    return (
      <main className="page--login">
        <h2>Log in</h2>
        <p className="lead lead--centered">You must be an authorized user to access this application.</p>
        <StyledFirebaseAuth uiConfig={uiAuthConfig} firebaseAuth={UserModel.authenticate()} />
      </main>
    );
  }
}

export default LoginPage;
