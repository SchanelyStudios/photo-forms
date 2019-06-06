import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormModel from '../models/form.model';
import OptionsModel from '../models/options.model';
import FieldModel from '../models/field.model';

import FieldEditor from './fields/FieldEditor';
import Spinner from './common/Spinner';
import Breadcrumbs from './app/Breadcrumbs';


class EditFormPage extends Component {

  constructor(props, state) {
    super(props, state);
    this.formModel = new FormModel();
    this.fieldModel = new FieldModel();
    this.optionsModel = new OptionsModel();
    this.formId = this.props.match ? this.props.match.params.formId : null;
    this.newForm = this.formId && this.formId !== '0' ? false : true;
    this.updatingFieldValues = false;

    this.state = {
      form: null,
      loading: true,
      breadcrumbs: [],
      exited: false,
      cancellend: false,
      savedFirstTime: false,
      loadingMessage: 'Loading form editor...'
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.addField = this.addField.bind(this);
    this.addTextBlock = this.addTextBlock.bind(this);
  }

  addField(e) {
    e.preventDefault();
    let form = this.state.form;
    let fields = form.fields;
    fields.push({
      id: '0',
      type: 'singeline'
    });
    form.fields = fields;
    this.setState({ form });
  }

  addTextBlock(e) {
    e.preventDefault();
    let form = this.state.form;
    let fields = form.fields;
    fields.push({
      id: '0',
      type: 'textblock'
    });
    form.fields = fields;
    this.setState({ form });
  }

  cancelForm(e) {
    e.preventDefault();
    this.setState({
      cancelled: true
    });
  }

  componentDidMount() {
    this.getForm();
  }

  featureField(e, position, field) {
    e.preventDefault();
    field.isFeatured = !field.isFeatured;
    this.onChangeField(field, position, true);
  }

  async getForm() {
    let form, breadcrumbs;
    if (this.newForm) {
      breadcrumbs = [];
      form = this.formModel.getEmpty();
    } else {
      form = await this.formModel.getFullForm(this.formId);
      breadcrumbs = [{
        label: form.name,
        path: `/form/${form.id}/submissions`
      }];
    }
    this.setState({
      form,
      breadcrumbs,
      loading: false,
      loadingMessage: 'Editor loaded. Displaying now...'
    });
  }

  moveDown(e, currentPosition) {
    e.preventDefault();
    let form = this.state.form,
      fields = form.fields,
      targetPosition = currentPosition === fields.length - 1 ? currentPosition : currentPosition + 1,
      item = fields.splice(currentPosition, 1)[0];
    fields.splice(targetPosition, 0, item);
    form.fields = fields;
    this.setState({
      form
    });
  }

  moveUp(e, currentPosition) {
    e.preventDefault();
    let form = this.state.form,
      fields = form.fields,
      targetPosition = currentPosition === 0 ? currentPosition : currentPosition - 1,
      item = fields.splice(currentPosition, 1)[0];
    fields.splice(targetPosition, 0, item);
    form.fields = fields;
    this.setState({
      form
    });
  }

  onChange(e) {
    e.preventDefault();
    let form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({
      form
    });
  }

  onChangeField(field, order, updateField) {
    console.log('received data on page', field, order, updateField);
    let form = this.state.form;
    let fields = form.fields;
    fields.splice(order, 1, field);
    this.updatingFieldValues = updateField ? false : true;
    this.setState({
      form
    });
  }

  removeField(e, position) {
    e.preventDefault();
    let form = this.state.form;
    let fields = form.fields;
    fields.splice(position, 1);
    form.fields = fields;
    this.setState({
      form
    });
  }

  async saveField(field) {
    let fieldId = field.id;

    // Save list-realted stuff first
    if (field.type === 'list') {
      field.optionsId = await this.saveOptions(field);
    }

    let fieldData = {
      alias: field.alias || '',
      label: field.label || '',
      description: field.description || '',
      helpText: field.helpText || '',
      optionsId: field.optionsId || null,
      type: field.type,
      isFeatured: field.hasOwnProperty('isFeatured') ? field.isFeatured : false
    };

    if (fieldId && fieldId !== '0') {
      this.fieldModel.save(fieldId, fieldData);
    } else {
      fieldId = this.fieldModel.add(fieldData);
    }

    return fieldId;
  }

  async saveForm(e, stayOnPage) {
    e.preventDefault();
    this.setState({
      loading: true,
      loadingMessage: 'Saving form...'
    });

    let form = {
      name: this.state.form.name,
      instructions: this.state.form.instructions,
      fields: this.state.form.fields
    };
    let savedFirstTime = this.newForm;
    let exited = !stayOnPage;

    // Save fields first and convert list of field data to list of field Ids
    let fieldIds = [];
    for (let field of form.fields) {
      let fieldId = await this.saveField(field);
      fieldIds.push(fieldId);
    }
    form.fields = fieldIds;

    // Send appropriate query to save form itself
    if (this.newForm) {
      let formId = await this.formModel.add(form);
      this.newForm = false;
      this.formId = formId;
    } else {
      await this.formModel.save(this.formId, form);
    }

    this.setState({
      savedFirstTime,
      exited
    }, () => {
      if (!savedFirstTime && !exited) {
        this.getForm();
      }
    });
  }

  async saveOptions(field) {
    let options = {
      listType: field.options.listType,
      showOther: field.options.showOther,
      items: field.options.items
    };
    let optionsId = field.optionsId;

    if (optionsId && optionsId !== '0') {
      this.optionsModel.save(optionsId, options);
    } else {
      optionsId = await this.optionsModel.add(options);
    }

    return optionsId;
  }

  shouldComponentUpdate() {
    if (this.updatingFieldValues) {
      this.updatingFieldValues = false;
      return false;
    }
    return true;
  }

  showFormEditor() {

    let form = this.state.form;
    let fields = form.fields;
    let key = Math.floor(Math.random() * 1000);
    let order = -1;

    return (
      <form>
        <p>
          <strong>Note:</strong> All forms will requst the user's email address
          and will save the date the submission is first saved along with the
          last date it was updated.
        </p>
        <ul>
          <li>
            <label className="field__label">Form name</label>
            <div className="field__controls">
              <input type="text" name="name" onChange={this.onChange} value={form.name} />
            </div>
          </li>
          <li>
            <label className="field__label">Form instructions</label>
            <div className="field__controls">
              <textarea name="instructions" onChange={this.onChange} value={form.instructions} />
            </div>
          </li>
        </ul>
        <div className="control-bar">
          <h3>Fields</h3>
        </div>
        <ul>
          {fields.map(field => {

            console.log(field);

            order++;
            key++;

            let position = order;
            let isLastItem = position === fields.length - 1 ? true : false;
            let isFirstItem = position === 0 ? true : false;

            let featuredClass = field.hasOwnProperty('isFeatured') && field.isFeatured
              ? 'icon icon--star-solid'
              : 'icon icon--star';

            return (
              <li key={key} className="field-item">
                <div className="field__group-heading control-bar">
                  <div className="btn-bar">
                    <button className="btn--nav btn--small" disabled={isFirstItem} onClick={(e) => this.moveUp(e, position)}>
                      <i className="icon icon--up" title="Move field up" />
                    </button>
                    <button className="btn--nav btn--small" disabled={isLastItem} onClick={(e) => this.moveDown(e, position)}>
                      <i className="icon icon--down" title="Move field down" />
                    </button>
                  </div>
                  <div classnam="btn-bar">
                    <button className="btn--caution btn--small" onClick={(e) => this.featureField(e, position, field)}>
                      <i className={featuredClass} title="Feature field" />
                    </button>
                  </div>
                  <div classnam="btn-bar">
                    <button className="btn--danger btn--small" onClick={(e) => this.removeField(e, position)}>
                      <i className="icon icon--trash" title="Delete field" />
                    </button>
                  </div>
                </div>
                <FieldEditor field={field} order={order} changeHandler={this.onChangeField} />
              </li>
            );
          })}
        </ul>
        <div className="form__actions form__actions--sticky">
          <button className="btn--success" type="submit" onClick={(e) => this.saveForm(e, true)}>Save</button>
          <button className="btn--caution" type="submit" onClick={(e) => this.saveForm(e, false)}>Save and close</button>
          <button className="btn--danger" type="submit" onClick={this.cancelForm}>Close</button>
          <button className="btn--nav">
            <i className="icon icon--eye" />&nbsp;
            Preview
          </button>
          <button className="btn--success" onClick={this.addField}>
            <i className="icon icon--add" />&nbsp;
            Field
          </button>
          <button className="btn--success" onClick={this.addTextBlock}>
            <i className="icon icon--add" />&nbsp;
            Text Block
          </button>
        </div>
      </form>
    );
  }

  render() {

    if (this.state.exited || (this.state.cancelled && !this.newForm)) {
      return (
        <Redirect to={`/form/${this.formId}/submissions`} />
      );
    } else if (this.state.cancelled) {
      return (
        <Redirect to={'/'} />
      );
    } else if (this.state.savedFirstTime) {
      return (
        <Redirect to={`/form/${this.formId}/edit`} />
      );
    }

    let output;
    if (this.state.loading) {
      output = (
        <Spinner>{this.state.loadingMessage}</Spinner>
      );
    } else {
      output = this.showFormEditor();
    }

    let breadcrumbLabel = this.newForm ? 'Create form' : 'Edit form';

    return (
      <main>
        <Breadcrumbs paths={this.state.breadcrumbs} current={breadcrumbLabel} />
        {output}
      </main>
    );
  }
}

export default EditFormPage;
