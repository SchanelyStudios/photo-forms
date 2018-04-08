import React, { Component } from 'react';
import SubmissionModel from '../models/submission.model';

class SubmissionListPage extends Component {

  constructor() {
    super();
    this.model = new SubmissionModel();

    this.state = {};
  }

  render() {
    return (
      <main>
        <p>Submission list page coming soon</p>
      </main>
    );
  }
}

export default SubmissionListPage;
