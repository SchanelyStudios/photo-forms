import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiAuthConfig, UserModel } from '../models/user.model';

import { Redirect } from 'react-router-dom';

class LogoutPage extends Component {

  componentDidMount() {
    UserModel.unauthenticate();
    console.log(UserModel.isAuthenticated());
  }

  render() {
    return (
      <Redirect to={'/login'} />
    );
  }
}

export default LogoutPage;
