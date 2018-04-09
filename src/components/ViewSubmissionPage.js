import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class ViewSubmissionPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.submissionId = this.props.match ? this.props.match.params.submissionId : null;
  }

  render() {
    if (this.submissionId === null) {
      return (
        <main>
          <p>No form data found.</p>
        </main>
      );
    }

    return (
      <main>
        <Link to={`/submission/${this.submissionId}/edit`}>Edit</Link>
        <p>Data coming soon!</p>
      </main>
    );
  }
}

export default ViewSubmissionPage;
