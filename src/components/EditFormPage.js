import React, { Component } from 'react';
import FormModel from '../models/form.model';

import FieldEditor from './fields/FieldEditor';

class EditFormPage extends Component {

  constructor(props, state) {
    super(props, state);
    this.formModel = new FormModel();
    this.formId = this.props.match ? this.props.match.params.formId : null;
    this.newForm = this.formId && this.formId !== '0' ? false : true

    this.state = {
      form: null,
      loading: true
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.updatingFieldValues = false;
  }

  componentDidMount() {
    this.getForm();
  }

  shouldComponentUpdate() {
    if (this.updatingFieldValues) {
      this.updatingFieldValues = false;
      return false;
    }
    return true;
  }

  async getForm() {
    let form;
    if (this.newForm) {
      form = this.formModel.getEmpty();
    } else {
      form = await this.formModel.get(this.formId);
    }
    this.setState({
      form,
      loading: false
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
    })
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
    })
  }

  onChange(e) {
    let form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({
      form
    })
  }

  onChangeField(field, order) {
    let form = this.state.form;
    let fields = form.fields;
    fields.splice(order, 1, field);
    this.updatingFieldValues = true;
    this.setState({
      form
    })
  }

  saveForm(e) {
    e.preventDefault();
    let form = {
      name: this.state.form.name,
      instructions: this.state.form.instructions,
      fields: this.state.form.fields
    }
    if (this.newForm) {
      this.formModel.add(form);
    } else {
      this.formModel.save(this.formId, form);
    }
  }

  showFormEditor() {

    let form = this.state.form;
    let fields = form.fields;
    let key = Math.floor(Math.random() * 1000);
    let order = -1;

    return (
      <form onSubmit={this.saveForm}>
        <p><strong>Note:</strong> All forms will requst the user's email address by default.</p>
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
        <h3>Fields</h3>
        <ul>
          {fields.map(field => {
            let position = order + 1;
            let isLastItem = position === fields.length - 1 ? true : false;
            let isFirstItem = position === 0 ? true : false;

            order++;
            key++;

            return (
              <li key={key}>
                <p className="field__group-heading">
                  Field {position}
                  <button disabled={isFirstItem} onClick={(e) => this.moveUp(e, position)}>&uarr; Up</button>
                  <button disabled={isLastItem} onClick={(e) => this.moveDown(e, position)}>&darr; Down</button>
                </p>
                <FieldEditor field={field} order={order} changeHandler={this.onChangeField} />
              </li>
            );
          })}
        </ul>
        <button type="submit">Save</button>
      </form>
    );
  }

  render() {
    let output;
    if (this.state.loading) {
      output = (
        <p>Loading form editor...</p>
      )
    } else {
      output = this.showFormEditor();
    }

    return (
      <main>
        {output}
      </main>
    );
  }
}

export default EditFormPage;
