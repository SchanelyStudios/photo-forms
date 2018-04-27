import React, { Component } from 'react';
import firebase from '../services/firebase';

import { Redirect } from 'react-router-dom';

class LogoutPage extends Component {

  state  = {
    loggedOut: false
  }

  componentDidMount() {

    let that = this;
    firebase.auth().signOut().then(function() {

      window.localStorage.setItem('PF_USER_UID', null);
      window.localStorage.setItem('PF_USER_NAME', null);
      window.localStorage.setItem('PF_USER_EMAIL', null);
      window.localStorage.setItem('PF_USER_AUTH', false);

      that.setState({
        loggedOut: true
      });

    }).catch(function(error) {
      console.error('Singout error: ', error);
    });
  }

  render() {
    if (this.state.loggedOut) {
      return (
        <Redirect to={'/'} />
      );
    }
    return (
      <p>Logging out...</p>
    );
  }
}

export default LogoutPage;
