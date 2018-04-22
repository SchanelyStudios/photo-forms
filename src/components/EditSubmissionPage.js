import React, { Component } from 'react';
import FillableForm from './common/FillableForm';
import Breadcrumbs from './app/Breadcrumbs';

import SubmissionModel from '../models/submission.model';
import FormModel from '../models/form.model';

class EditSubmissionPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.submissionModel = new SubmissionModel();
    this.formModel = new FormModel();

    this.state = {
      submissionId: this.props.match ? this.props.match.params.submissionId : null,
      breadcrumbs: []
    };
  }

  componentDidMount() {
    if (this.state.submissionId) {
      this.getSubmission();
    }
  }

  async getSubmission() {
    let submission = await this.submissionModel.get(this.state.submissionId);
    this.setState({
      breadcrumbs: [{
        label: submission.form.name,
        path: `/form/${submission.form.id}/submissions`
      }]
    });
  }

  render() {
    if (this.state.submissionId === null) {
      return (
        <main>
          <p>No form data found.</p>
        </main>
      );
    }

    return (
      <main>
        <Breadcrumbs paths={this.state.breadcrumbs} current={'Update submission'}/>
        <FillableForm submissionId={this.state.submissionId} />
      </main>
    );
  }
}

export default EditSubmissionPage;
