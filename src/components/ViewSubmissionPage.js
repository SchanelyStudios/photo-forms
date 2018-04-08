import React, { Component } from 'react';
import SubmissionModel from '../models/submission.model';

class ViewSubmissionPage extends Component {

  constructor() {
    super();
    this.model = new SubmissionModel();

    this.state = {};
  }

  render() {
    return (
      <main>
        <p>View submission page coming soon</p>
      </main>
    );
  }
}

export default ViewSubmissionPage;
