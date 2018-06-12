import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: proces.env.REACT_APP_PF_API_KEY,
  authDomain: process.env.REACT_APP_PF_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PF_DB_URL,
  projectId: process.env.REACT_APP_PF_PROJECT_ID,
  storageBucket: proces.env.REACT_APP_PF_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PF_MSG_SENDER_ID
};
firebase.initializeApp(config);

export default firebase;
