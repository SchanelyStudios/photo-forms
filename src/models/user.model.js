import firebase from './firebase';

export const uiAuthConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/',
  signInFlow: 'popup',
};

export class UserModel {
  _schema = {
    id: '',
    email: '',
    name: '',
    allowed: false
  };

  static isAuthenticated() {
    if (window.localStorage.getItem('PF_USER_UID')) {
      return true;
    }
    return false;
  }

  static authenticate() {
    return firebase.auth()
  }

  static getAuthenticated() {
    return firebase.auth().onAuthStateChanged((user) => {
      // TODO: Ensure user is on approved user list.
      window.localStorage.setItem('PF_USER_UID', user.uid);
      window.localStorage.setItem('PF_USER_NAME', user.name);
      window.localStorage.setItem('PF_USER_EMAIL', user.email);
      return user;
    });
  }
}
