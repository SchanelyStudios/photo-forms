import React, { Component } from 'react';
import SubmissionModel from '../models/submission.model';

class EditSubmissionPage extends Component {

  constructor() {
    super();
    this.model = new SubmissionModel();

    this.state = {};
  }

  render() {
    return (
      <main>
        <p>Edit submission page coming soon</p>
      </main>
    );
  }
}

export default EditSubmissionPage;
