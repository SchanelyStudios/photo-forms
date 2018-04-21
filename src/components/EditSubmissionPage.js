import React, { Component } from 'react';
import FillableForm from './common/FillableForm';
import Breadcrumbs from './app/Breadcrumbs';

class EditSubmissionPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      submissionId: this.props.match ? this.props.match.params.submissionId : null,
      breadcrumbs: [
        {
          path: '#',
          label: 'Form'
        }
      ]
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
        <Breadcrumbs paths={this.state.breadcrumbs} current={'Update submission'}/>
        <FillableForm submissionId={this.state.submissionId} />
      </main>
    );
  }
}

export default EditSubmissionPage;
