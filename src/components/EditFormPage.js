import React, { Component } from 'react';
import FormModel from '../models/form.model';

class EditFormPage extends Component {

  constructor() {
    super();
    this.model = new FormModel();

    this.state = {};
  }

  render() {
    return (
      <main>
        <p>Edit form page coming soon</p>
      </main>
    );
  }
}

export default EditFormPage;
