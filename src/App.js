import React, { Component } from 'react';
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

class App extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('Form');

    this.state = {
      forms: []
    };
  }

  componentDidMount() {
    this.getForms();
  }

  componentWillUnmount() {
    this.setState({ forms: [] });
  }

  getForms() {
    return this.ref.get().then((snapshot) => {
      let forms = [];
      snapshot.forEach((doc) => {
        let data = doc.data();
        let form = {
          id: doc.id,
          name: data.name ? data.name : 'Unnamed form'
        };
        forms.push(form);
      });
      this.setState({ forms });
      return snapshot;
    });
  }

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
          <ul>
            {this.state.forms.map(form => {
              return (
                <li key={form.id}>{form.name}</li>
              );
            })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
