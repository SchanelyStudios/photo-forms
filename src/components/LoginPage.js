import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiAuthConfig, UserModel } from '../models/user.model';

class LoginPage extends Component {

  componentDidMount() {
    UserModel.getAuthenticated();
  }

  render() {
    return (
      <main>
        <h2>Log in</h2>
        <p>You must be an authorized user to access this application.</p>
        <StyledFirebaseAuth uiConfig={uiAuthConfig} firebaseAuth={UserModel.authenticate()}/>
      </main>
    );
  }
}

export default LoginPage;
