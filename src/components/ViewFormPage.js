import React, { Component } from 'react';
import FormModel from '../models/form.model';

class ViewFormPage extends Component {

  constructor() {
    super();
    this.model = new FormModel();

    this.state = {};
  }

  render() {
    return (
      <main>
        <p>View form page coming soon</p>
      </main>
    );
  }
}

export default ViewFormPage;
