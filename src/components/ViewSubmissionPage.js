import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubmissionModel from '../models/submission.model';
import FormModel from '../models/form.model';

import Spinner from './common/Spinner';
import Breadcrumbs from './app/Breadcrumbs';

class ViewSubmissionPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      loading: true,
      submission: null,
      form: null,
      breadcrumbs: [
        {
          path: '#',
          label: 'Form'
        }
      ]
    }

    this.submissionModel = new SubmissionModel();
    this.formModel = new FormModel();
    this.submissionId = this.props.match ? this.props.match.params.submissionId : null;
  }

  componentDidMount() {
    if (this.submissionId !== null) {
      this.getSubmission(this.submissionId);
    } else {
      this.setState({
        loading: false
      })
    }
  }

  async getSubmission(id) {
    let submission = await this.submissionModel.get(id);
    let form = await this.formModel.getFullForm(submission.form);
    this.setState({
      submission,
      form,
      loading: false
    });
  }

  showSubmission() {
    let sub = this.state.submission;
    let form = this.state.form;
    return (
      <div className="submission">
        <div className="control-bar">
          <h2>
            {form.name}
          </h2>
          <div className="btn-group">
            <Link to={`/submission/${this.submissionId}/edit`} className="btn btn--caution btn--small">
              <i className="icon icon--edit" />
            </Link>
          </div>
        </div>
        <p>Submission started {sub.dateStarted} and updated {sub.dateUpdated}</p>
        <div className="submission__form-instructions">
          <p>{form.instructions}</p>
          {this.showFields()}
        </div>
      </div>
    );
  }

  getValue(alias) {
    let value = this.state.submission.values.hasOwnProperty(alias) ? this.state.submission.values[alias] : '';
    if (alias === 'email') {
      value = this.state.submission.email;
    }
    if (value instanceof Array) {
      value = value.join(', ');
    }
    return value;
  }

  showField(field) {
    let value = this.getValue(field.alias);
    return (
      <li className="field" key={field.alias}>
        <b className="field__label">{field.label}</b>
        <div className="field__controls">
          <p className="field__description">{field.description}</p>
          <div className="field__value">
            {value}
          </div>
        </div>
      </li>
    );
  }

  showFields() {
    let fields = this.state.form.fields;
    let emailField = this.formModel.getEmailFieldSettings();
    return (
      <ul className="submission__field-list">
        {this.showField(emailField)}
        {fields.map(field => this.showField(field))}
      </ul>
    );
  }

  render() {
    let submission;
    if (this.state.loading === true) {
      submission = (
        <Spinner>Loading submission...</Spinner>
      );
    } else if (this.submissionId === null || this.state.form === null) {
      submission = (
        <p>No form data found.</p>
      );
    } else {
      submission = this.showSubmission();
    }

    return (
      <main>
        <Breadcrumbs paths={this.state.breadcrumbs} current={'View Submission'}/>
        {submission}
      </main>
    );
  }
}

export default ViewSubmissionPage;
