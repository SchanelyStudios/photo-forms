import React, { Component } from 'react';
import FormModel from '../models/form.model';
import SinglelineInput from './common/SinglelineInput';
import MultilineInput from './common/MultilineInput';
import ListInput from './common/ListInput';

class ViewFormPage extends Component {

  constructor() {
    super();
    this.model = new FormModel();

    this.state = {
      form: null
    };
  }

  componentDidMount() {
    this.getForm();
  }

  getForm() {
    if (this.props.match.params.formId) {

    } else {
      // TODO: No form supplied; need to decide how to respond.
    }
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
