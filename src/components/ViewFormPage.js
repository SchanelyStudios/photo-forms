import React, { Component } from 'react';
import FormModel from '../models/form.model';
import SubmissionModel from '../models/submission.model';

import SinglelineInput from './common/SinglelineInput';
import MultilineInput from './common/MultilineInput';
import ListInput from './common/ListInput';

class ViewFormPage extends Component {

  constructor() {
    super();
    this.model = new FormModel();
    this.values = {};

    this.state = {
      loading: true,
      form: null
    };

    this.setFieldvalue = this.setFieldvalue.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  cancelForm(e) {
    e.preventDefault();
    return null;
  }

  componentDidMount() {
    this.getForm();
  }

  async getForm() {
    if (this.props.match.params.formId) {
      let form = await this.model.get(this.props.match.params.formId);
      this.setState({
        loading: false,
        form
      });
    } else {
      this.setState({
        loading: false
      })
    }
  }

  saveForm(e, stayOnPage) {
    e.preventDefault();
    let submissionModel = new SubmissionModel();
    submissionModel.add({
      dateStarted: Date.now(),
      dateSubmitted: Date.now(),
      form: this.state.form.id,
      values: this.values
    });
  }

  setFieldvalue(field, value) {
    this.values[field] = value;
  }

  showFields() {
    let fields = this.state.form.fields.map((field) => {
      this.values[field.alias] = '';
      let description = field.description ? (
        <p className="field__description">{field.description}</p>
      ) : '';
      let helpText = field.helpText ? (
        <p className="field__helpText">{field.helpText}</p>
      ) : '';

      let fieldComponent = '';
      switch(field.type) {
        case 'list':
          fieldComponent = (
            <ListInput
              name={field.alias}
              onChange={this.setFieldvalue}
              value=""
              optionsId={field.optionsId}
            />
          );
        break;
        case 'multiline':
          fieldComponent = (
            <MultilineInput
              name={field.alias}
              onChange={this.setFieldvalue}
              value=""
            />
          );
        break;
        case 'singleline':
        default:
          fieldComponent = (
            <SinglelineInput
              name={field.alias}
              onChange={this.setFieldvalue}
              value=""
            />
          );
        break;
      }

      return (
        <li key={field.alias}>
          <label>{field.label}</label>
          <div className="field-controls">
            {description}
            {fieldComponent}
            {helpText}
          </div>
        </li>
      );
    });

    return (
      <ul>
        {fields}
      </ul>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <main>
          <p>Loading...</p>
        </main>
      );
    } else if (this.form === null) {
      return (
        <main>
          <p>No form found.</p>
        </main>
      );
    }

    let fields = this.showFields();

    return (
      <main>
        <p>{this.state.form.instructions}</p>
        <form onSubmit={this.saveForm}>
          {fields}
          <p className="form__actions">
            <button onClick={(e) => this.saveForm(e, true)} type="submit" name="btn-save">
              Save
            </button>
            {/*}<button onClick={(e) => this.saveForm(e, false)} type="submit" name="btn-exit">
              Save and close
            </button>
            <button onClick={this.cancelForm} type="button" name="btn-cancel">
              Cancel
            </button>*/}
          </p>
        </form>
      </main>
    );
  }
}

export default ViewFormPage;
