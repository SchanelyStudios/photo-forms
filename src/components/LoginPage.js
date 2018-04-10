import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiAuthConfig, UserModel } from '../models/user.model';

class LoginPage extends Component {

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    UserModel.authenticate().onAuthStateChanged(
        (user) => this.setState({ signedIn: !!user })
    );
  }

  render() {
    return (
      <main>
        <h2>Log in</h2>
        <p>You must be an authorized user to access this application.</p>
        <StyledFirebaseAuth uiConfig={uiAuthConfig} firebaseAuth={UserModel.authenticate()}/>
        {/*<div id="login-form" />*/}
      </main>
    );
  }
}

export default LoginPage;
