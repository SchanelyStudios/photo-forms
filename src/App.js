import React, { Component } from 'react';
import * as firebase from "firebase";

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

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <h1>Photo Forms</h1>
        </header>
        <main>
          <h2>Welcome!</h2>
          <p>
            This applicaiton is currently under development.
            Check back again soon!
          </p>
          <ul className="tiles">
            <li>
              <img src="http://placehold.it/400x400x" alt="thing" />
              <h3>Heading</h3>
            </li>
            <li>
              <img src="http://placehold.it/400x400x" alt="thing" />
              <h3>Heading</h3>
            </li>
            <li>
              <img src="http://placehold.it/400x400x" alt="thing" />
              <h3>Heading</h3>
            </li>
            <li>
              <img src="http://placehold.it/400x400x" alt="thing" />
              <h3>Heading</h3>
            </li>
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
