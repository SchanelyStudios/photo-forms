import React, { Component } from 'react';
import ListEditor from './ListEditor';

import FieldModel from '../../models/field.model';
import OptionsModel from '../../models/options.model';

import Spinner from '../common/Spinner';

class FieldEditor extends Component {

  constructor(props, state) {
    super(props, state);

    this.optionsModel = new OptionsModel();
    this.fieldModel = new FieldModel();

    this.updatingOptions = false;

    let field = null,
        loadingField = true,
        loadingOptions = false,
        options = null,
        optionsId = null;

    if (this.props.field.hasOwnProperty('id')) {
      field = this.props.field;
      loadingField = false;
      if (this.props.field.options) {
        options = this.props.field.options;
        optionsId = this.props.field.optionsId;
      } else if (this.props.field.type === 'list') {
        loadingOptions = true;
        optionsId = this.props.field.optionsId;
      }
    }

    this.state = {
      field,
      loadingField,
      loadingOptions,
      options,
      optionsId
    };

    this.onChange = this.onChange.bind(this);
    this.onListChange = this.onListChange.bind(this);
  }

  componentDidMount() {
    if (this.state.loadingField) {
      this.getField();
      return;
    }
    if (this.state.loadingOptions) {
      this.getOptions(this.state.optionsId);
      return;
    }
  }

  async getField() {

    let field = this.fieldModel.getEmpty();
    let loadingOptions = false;

    // Check for a field provided
    if (this.props.field && this.props.field.hasOwnProperty('id') && this.props.field.id !== '0') {
      field = await this.fieldModel.get(this.props.field);

      // Load related options (defer state update to that method...)
      loadingOptions = field.type === 'list' && field.optionsId !== '0';
    }

    this.setState({
      field,
      optionsId: field.optionsId,
      loadingField: false,
      loadingOptions
    }, () => {
      if (loadingOptions) {
        this.getOptions(field.optionsId);
      } else {
        this.sendChange();
      }
    });
  }

  async getOptions(optionsId) {
    let options = this.optionsModel.getEmpty();

    if (optionsId && optionsId !== '0') {
      options = await this.optionsModel.get(optionsId);
    }

    this.setState({
      options,
      loadingOptions: false
    }, this.sendChange);
  }

  onChange(e) {
    e.preventDefault();
    let target = e.target.name;
    let value = e.target.value;
    let field = this.state.field;
    field[e.target.name] = e.target.value;

    let options = this.state.options;

    if (target === 'type'
      && value === 'list'
      && this.state.options === null) {
      options = this.optionsModel.getEmpty();
    }

    this.setState({
      field,
      options
    }, this.sendChange);
  }

  onListChange(options) {
    this.updatingOptions = true;
    this.setState({ options }, this.sendChange);
  }

  sendChange() {
    let fieldData = {
      alias: this.state.field.alias || '',
      label: this.state.field.label || '',
      description: this.state.field.description || '',
      helpText: this.state.field.helpText || '',
      type: this.state.field.type,
      options: this.state.options,
      optionsId: this.state.optionsId || null,
      id: this.state.field.id
    };
    this.props.changeHandler(fieldData, this.props.order);
  }

  shouldComponentUpdate() {
    if (this.updatingOptions) {
      this.updatingOptions = false;
      return false;
    } else {
      return true;
    }
  }

  showListEditor() {
    if (this.state.field.type !== 'list') {
      return null;
    }

    if (this.state.loadingOptions) {
      return (
        <Spinner>Loading options...</Spinner>
      );
    }

    return (
      <ListEditor
        options={this.state.options}
        changeHandler={this.onListChange}
      />
    );
  }

  showFieldEditor() {
    let field = this.state.field;

    return (
      <div className="field-editor">
        <ul className="field-list">
          <li className="field--labelField">
            <label className="field__label">Label</label>
            <div className="field__controls">
              <input type="text" name="label" onChange={this.onChange} value={field.label} />
            </div>
          </li>
          <li className="field--aliasField">
            <label className="field__label">Alias</label>
            <div className="field__controls">
              <input type="text" name="alias" onChange={this.onChange} value={field.alias} />
            </div>
          </li>
          <li>
            <label className="field__label">Description</label>
            <div className="field__controls">
              <textarea name="description" onChange={this.onChange} value={field.description} />
            </div>
          </li>
          <li>
            <label className="field__label">Help text</label>
            <div className="field__controls">
              <textarea name="helpText" onChange={this.onChange} value={field.helpText} />
            </div>
          </li>
          <li className="field--half">
            <label className="field__label">Type</label>
            <div className="field__controls">
              <select type="text" name="type" onChange={this.onChange} value={field.type}>
                <option value="singleline">Single line</option>
                <option value="multiline">Mult-line</option>
                <option value="list">List</option>
              </select>
            </div>
          </li>
        </ul>
        {this.showListEditor()}
      </div>
    );
  }

  showTextblockEditor() {
    let field = this.state.field;

    return (
      <div className="field-editor">
        <ul className="field-list">
          <li className="field--labelField">
            <label className="field__label">Heading</label>
            <div className="field__controls">
              <input type="text" name="label" onChange={this.onChange} value={field.label} />
            </div>
          </li>
          <li className="field--aliasField">
            <label className="field__label">Alias</label>
            <div className="field__controls">
              <input type="text" name="alias" onChange={this.onChange} value={field.alias} />
            </div>
          </li>
          <li>
            <label className="field__label">Content</label>
            <div className="field__controls">
              <textarea name="description" onChange={this.onChange} value={field.description} />
            </div>
          </li>
        </ul>
      </div>
    );
  }

  render() {

    if (this.state.loadingField) {
      return (
        <Spinner>Loading field...</Spinner>
      )
    }

    let field = this.state.field;

    return field.type === 'textblock'
      ? this.showTextblockEditor()
      : this.showFieldEditor();
  }
}

export default FieldEditor;
