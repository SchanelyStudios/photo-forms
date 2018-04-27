import React, { Component } from 'react';

import { authConfig } from '../services/auth';
import firebase from '../services/firebase';
import firebaseui from 'firebaseui';

class LoginPage extends Component {

  componentDidMount() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        ui.start('#firebaseui-auth-container', authConfig);
      });
  }

  render() {
    return (
      <main className="page--login">
        <h2>Log in</h2>
        <p className="lead lead--centered">You must be an authorized user to access this application.</p>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </main>
    );
  }
}

export default LoginPage;
