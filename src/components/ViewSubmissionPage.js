import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubmissionModel from '../models/submission.model';
import FormModel from '../models/form.model';

class ViewSubmissionPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      loading: true,
      submission: null,
      form: null
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
    console.log(submission);
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
        <h2>{form.name} <Link to={`/submission/${this.submissionId}/edit`}>Edit</Link></h2>
        <p>Submission started {sub.dateStarted} and updated {sub.dateUpdated}</p>
        <div className="submission__form-instructions">
          <p>{form.instructions}</p>
          {this.showFields()}
        </div>
      </div>
    );
  }

  showFields() {
    let fields = this.state.form.fields;
    let values = this.state.submission.values;
    return (
        <ul className="submission__field-list">
          {fields.map(field => {
            let value = values.hasOwnProperty(field.alias) ? values[field.alias] : '';
            if (value instanceof Array) {
              value = value.join(', ');
            }
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
          })}
        </ul>
    );
  }

  render() {
    let submission;
    if (this.state.loading === true) {
      submission = (
        <p>Loading submission...</p>
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
        {submission}
      </main>
    );
  }
}

export default ViewSubmissionPage;
