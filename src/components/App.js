import React, { Component } from 'react';

import EmailService from '../services/email';

import Header from './app/Header';
import Footer from './app/Footer';

class App extends Component {

  sendMail(e) {
    console.log('Send mail', e);
    EmailService.send(
      'philschanely@gmail.com',
      'schanelyphotography@gmail.com',
      'Test email',
      '<p>Hey silly,</p><p>Just testing sending an email to you!</p>'
    ).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="app">
        {/*<button onClick={this.sendMail}>Send mail</button>*/}
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
