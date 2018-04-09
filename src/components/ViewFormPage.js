import React, { Component } from 'react';
import FillableForm from './common/FillableForm';

class ViewFormPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      formId: this.props.match ? this.props.match.params.formId : null
    };
  }

  render() {
    if (this.state.formId === null) {
      return (
        <main>
          <p>No form found.</p>
        </main>
      );
    }

    return (
      <main>
        <FillableForm formId={this.state.formId} />
      </main>
    );
  }
}

export default ViewFormPage;
