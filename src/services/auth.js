import firebase from './firebase';
import UserModel from '../models/user.model';

export class AuthService {

  static checkAuthedUser() {
    let auth = window.localStorage.getItem('PF_USER_AUTH');
    if (auth === true) {
      return true;
    }
    let email = window.localStorage.getItem('PF_USER_EMAIL');
    let authed = false;
    let model = new UserModel();
    return model.getList(['email', '==', email]).then(doc => {
      if (doc.length > 0) {
        let user = doc[0];
        if (user.email === email) {
          authed = true;
        }
      }
      window.localStorage.setItem('PF_USER_AUTH', authed);
      return authed;
    });
  }

  static isAuthenticated() {
    let userId = window.localStorage.getItem('PF_USER_UID');
    let authed = window.localStorage.getItem('PF_USER_AUTH');
    if (userId !== 'null' && authed) {
      return true;
    }
    return false;
  }

  static signInSuccess(authResult, redirectUrl) {
    let user = authResult.user;
    window.localStorage.setItem('PF_USER_UID', user.uid);
    window.localStorage.setItem('PF_USER_NAME', user.name);
    window.localStorage.setItem('PF_USER_EMAIL', user.email);
    window.localStorage.setItem('PF_USER_AUTH', 'unknown');
    return true;
  }
}

export const authConfig = {
  callbacks: {
    signInSuccessWithAuthResult: AuthService.signInSuccess,
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: '#'
};
