import firebase from './firebase';

export const uiAuthConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/',
  signInFlow: 'redirect',
  // callbacks: {
    // Modify here for redirect?
    // signInSuccessWithAuthResult: () => false
  // }
};

export class UserModel {
  _schema = {
    id: '',
    email: '',
    name: '',
    allowed: false
  };

  static isAuthenticated() {
    let user = this.getAuthenticated();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  static authenticate() {
    return firebase.auth();
  }

  static getAuthenticated() {
    return firebase.auth().currentUser;
  }

  static unauthenticate() {

  }
}
