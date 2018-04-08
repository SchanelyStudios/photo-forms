import React, { Component } from 'react';

import Header from './app/Header';
import Footer from './app/Footer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
