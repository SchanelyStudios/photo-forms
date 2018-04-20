import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router';
import FormModel from '../../models/form.model';
import SubmissionModel from '../../models/submission.model';

import SinglelineInput from './SinglelineInput';
import MultilineInput from './MultilineInput';
import ListInput from './ListInput';
import Spinner from './Spinner';

import { Link } from 'react-router-dom';

class ViewFormPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.formModel = new FormModel();
    this.submissionModel = new SubmissionModel();

    this.state = {
      loading: true,
      submissionId: this.props.submissionId ? this.props.submissionId : 0,
      formId: this.props.formId ? this.props.formId : 0,
      form: null,
      submission: null,
      values: {},
      email: '',
      cancelled: false,
      savedFirstTime: false,
      exited: false
    };

    this.setFieldValue = this.setFieldValue.bind(this);
    this.setEmailValue = this.setEmailValue.bind(this);
    this.saveData = this.saveData.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
  }

  cancelForm(e) {
    e.preventDefault();
    this.setState({
      cancelled: true
    });
    return;
  }

  componentDidMount() {
    if (this.props.submissionId) {
      // Get the submission and allow it to lead on to also load the form structure
      this.getSubmission();
    } else if (this.props.formId) {
      // Get just the form structure
      this.getForm();
    } else {
      // No form or data means no fun!
      this.setState({
        loading: false
      })
    }
  }

  async getSubmission() {
    let submission = await this.submissionModel.get(this.props.submissionId);
    this.setState({
      formId: submission.form,
      email: submission.email ? submission.email : this.state.email,
      values: submission.values,
      submission
    }, this.getForm);
  }

  async getForm() {
    if (this.state.formId === 0) {
      this.setState({
        loading: false
      });
      return;
    }
    let form = await this.formModel.getFullForm(this.state.formId);
    this.setState({
      loading: false,
      form
    });
  }

  async saveData(e, stayOnPage) {
    e.preventDefault();

    let submission = {
      // Start date is omitted to be added below based on whether save or add
      dateUpdated: moment().toDate(),
      email: this.state.email,
      form: this.state.form.id,
      values: this.state.values
    };
    if (this.props.submissionId) {
      submission.dateStarted = this.state.submission.dateStarted;
      await this.submissionModel.save(this.props.submissionId, submission);
      if (!stayOnPage) {
        this.setState({
          exited: true
        });
      }
    } else {
      submission.dateStarted = moment().toDate();
      let submissionId = await this.submissionModel.add(submission);
      this.setState({
        savedFirstTime: true,
        submissionId
      });
    }
  }

  setFieldValue(field, value) {
    let values = this.state.values;
    values[field] = value;
    this.setState({
      values
    });
  }

  setEmailValue(field, value) {
    this.setState({
      email: value
    });
  }

  showField(field) {
    let description = field.description ? (
      <p className="field__description">{field.description}</p>
    ) : '';

    let helpText = field.helpText ? (
      <p className="field__helpText">{field.helpText}</p>
    ) : '';

    let fieldComponent;
    if (field.alias === 'email') {
      let value = this.state.email;
      fieldComponent = (
        <SinglelineInput
          name={field.alias}
          onChange={this.setEmailValue}
          value={value}
        />
      );
    } else {
      fieldComponent = this.showFieldComponent(field);
    }

    return (
      <li key={field.alias} className="field">
        <label className="field__label">{field.label}</label>
        <div className="field__controls">
          {description}
          {fieldComponent}
          {helpText}
        </div>
      </li>
    );
  }

  showFieldComponent(field) {

    let value = this.state.values.hasOwnProperty(field.alias)
      ? this.state.values[field.alias]
      : '';

    let fieldComponent = '';
    switch(field.type) {
      case 'list':
        fieldComponent = (
          <ListInput
            name={field.alias}
            onChange={this.setFieldValue}
            value={value}
            optionsId={field.optionsId}
          />
        );
      break;
      case 'multiline':
        fieldComponent = (
          <MultilineInput
            name={field.alias}
            onChange={this.setFieldValue}
            value={value}
          />
        );
      break;
      case 'singleline':
      default:
        fieldComponent = (
          <SinglelineInput
            name={field.alias}
            onChange={this.setFieldValue}
            value={value}
          />
        );
      break;
    }

    return fieldComponent;
  }

  showFields() {
    let emailFieldConfig = this.formModel.getEmailFieldSettings();
    let emailField = this.showField(emailFieldConfig);
    let fields = this.state.form.fields.map((field) => this.showField(field));

    return (
      <ul className="form__fields">
        {emailField}
        {fields}
      </ul>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner>Loading form...</Spinner>
      );
    } else if (this.state.form === null) {
      return (
        <p>No form found.</p>
      );
    } else if (this.state.cancelled) {
      return (
        <p>You exited the form. No changes were saved.</p>
      );
    } else if (this.state.exited) {
      return (
        <div className="form__submitted">
          <p>Your changes were saved. You can view and edit your submission later here:</p>
          <Link to={`/submission/${this.state.submissionId}`}>
            {`http://forms.schanelyphotography.com/submission/${this.state.submissionId}`}
          </Link>
        </div>
      );
    } else if (this.state.savedFirstTime) {
      return (
        <Redirect to={`/submission/${this.state.submissionId}/edit`} />
      )
    }

    let fields = this.showFields();

    return (
      <form>
        <h2>
          {this.state.form.name}
        </h2>
        <div className="form__instructions">
          <p>{this.state.form.instructions}</p>
        </div>
        {fields}
        <p className="form__actions">
          <button className="btn--success" onClick={(e) => this.saveData(e, true)} type="submit" name="btn-save">
            Save
          </button>
          <button onClick={(e) => this.saveData(e, false)} type="submit" name="btn-exit">
            Save and close
          </button>
          <button className="btn--neutral" onClick={this.cancelForm} type="button" name="btn-cancel">
            Cancel
          </button>
        </p>
      </form>
    );
  }
}

export default ViewFormPage;
