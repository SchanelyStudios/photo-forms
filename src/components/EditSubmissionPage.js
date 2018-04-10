import React, { Component } from 'react';
import FillableForm from './common/FillableForm';

class EditSubmissionPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      submissionId: this.props.match ? this.props.match.params.submissionId : null
    };
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
        <FillableForm submissionId={this.state.submissionId} />
      </main>
    );
  }
}

export default EditSubmissionPage;
