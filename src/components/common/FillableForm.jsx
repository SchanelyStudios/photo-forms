import React, { Component } from 'react';
import FormModel from '../../models/form.model';
import SubmissionModel from '../../models/submission.model';

import SinglelineInput from './SinglelineInput';
import MultilineInput from './MultilineInput';
import ListInput from './ListInput';

class ViewFormPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.formModel = new FormModel();
    this.submissionModel = new SubmissionModel();

    this.state = {
      loading: true,
      formId: this.props.formId ? this.props.formId : 0,
      form: null,
      submission: null,
      values: {}
    };

    this.setFieldvalue = this.setFieldvalue.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  cancelForm(e) {
    e.preventDefault();
    return null;
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
    let form = await this.formModel.get(this.state.formId);
    this.setState({
      loading: false,
      form
    });
  }

  async saveData(e, stayOnPage) {
    e.preventDefault();
    if (this.props.submissionId) {
      console.log(this.props.submissionId);
      await this.submissionModel.save(this.props.submissionId, {
        dateUpdated: Date.now(),
        values: this.state.values
      });
    } else {
      let submissionId = await this.submissionModel.add({
        dateStarted: Date.now(),
        dateUpdated: Date.now(),
        form: this.state.form.id,
        values: this.state.values
      });
      // Redirect to ViewSubmissionPage
    }
  }

  setFieldvalue(field, value) {
    let values = this.state.values;
    values[field] = value;
    this.setState({
      values
    });
  }

  showFields() {
    let fields = this.state.form.fields.map((field) => {
      let description = field.description ? (
        <p className="field__description">{field.description}</p>
      ) : '';
      let helpText = field.helpText ? (
        <p className="field__helpText">{field.helpText}</p>
      ) : '';

      let value = this.state.values.hasOwnProperty(field.alias)
        ? this.state.values[field.alias]
        : '';

      let fieldComponent = '';
      switch(field.type) {
        case 'list':
          fieldComponent = (
            <ListInput
              name={field.alias}
              onChange={this.setFieldvalue}
              value={value}
              optionsId={field.optionsId}
            />
          );
        break;
        case 'multiline':
          fieldComponent = (
            <MultilineInput
              name={field.alias}
              onChange={this.setFieldvalue}
              value={value}
            />
          );
        break;
        case 'singleline':
        default:
          fieldComponent = (
            <SinglelineInput
              name={field.alias}
              onChange={this.setFieldvalue}
              value={value}
            />
          );
        break;
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
    });

    return (
      <ul className="form__fields">
        {fields}
      </ul>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      );
    } else if (this.form === null) {
      return (
        <p>No form found.</p>
      );
    }

    let fields = this.showFields();

    return (
      <form>
        <div className="form__instructions">
          <p>{this.state.form.instructions}</p>
        </div>
        {fields}
        <p className="form__actions">
          <button onClick={(e) => this.saveData(e, true)} type="submit" name="btn-save">
            Save
          </button>
          <button onClick={(e) => this.saveData(e, false)} type="submit" name="btn-exit">
            Save and close
          </button>
          {/*<button onClick={this.cancelForm} type="button" name="btn-cancel">
            Cancel
          </button>*/}
        </p>
      </form>
    );
  }
}

export default ViewFormPage;
