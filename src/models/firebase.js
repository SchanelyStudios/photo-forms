import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD8-YFz1kDzJsqgMdLbEtzyVo_j8UeMG3Y",
  authDomain: "photo-forms.firebaseapp.com",
  databaseURL: "https://photo-forms.firebaseio.com",
  projectId: "photo-forms",
  storageBucket: "photo-forms.appspot.com",
  messagingSenderId: "890222161817"
};
firebase.initializeApp(config);

export default firebase;
