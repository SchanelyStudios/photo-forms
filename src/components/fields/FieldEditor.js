import React, { Component } from 'react';
import ListEditor from './ListEditor';

import { OptionsModel } from '../../models/field.model';

class FieldEditor extends Component {

  constructor(props, state) {
    super(props, state);

    this.optionsModel = new OptionsModel();

    this.state = {
      alias: this.props.field.alias,
      label: this.props.field.label,
      description: this.props.field.description,
      helpText: this.props.field.helpText,
      type: this.props.field.type,
      loadingOptions: true,
      options: null
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getOptions();
  }

  async getOptions() {
    let options;

    if (this.props.field.optionsId && this.props.field.optionsId !== 0) {
      options = await this.optionsModel.get(this.props.field.optionsId);
    } else {
      options = this.optionsModel.getEmpty();
    }

    console.log(options);

    this.setState({
      options,
      loadingOptions: false
    });
  }

  onChange(e) {
    e.preventDefault();
    let field = {};
    field[e.target.name] = e.target.value;
    this.setState(field, () => {
      this.props.changeHandler(this.state, this.props.order);
    });
  }

  onListChange(options) {
    // TODO: Send/store changes up the chain
    // TODO: Ensure component does not refresh since child component handles changes
  }

  render() {

    let listEditor = '';

    if (this.state.type === 'list') {
      listEditor = !this.state.loadingOptions
        ? <ListEditor
            options={this.state.options}
            changeHandler={this.onListChange}
          />
        : <p>Loading options...</p>;
    }

    return (
      <div className="field-editor">
        <ul className="field-list">
          <li>
            <label className="field__label">Type</label>
            <div className="field__controls">
              <select type="text" name="type" onChange={this.onChange} value={this.state.type}>
                <option value="singleline">Single line</option>
                <option value="multiline">Mult-line</option>
                <option value="list">List</option>
              </select>
            </div>
          </li>
          <li>
            <label className="field__label">Label</label>
            <div className="field__controls">
              <input type="text" name="label" onChange={this.onChange} value={this.state.label} />
            </div>
          </li>
          <li>
            <label className="field__label">Description</label>
            <div className="field__controls">
              <textarea name="description" onChange={this.onChange} value={this.state.description} />
            </div>
          </li>
          <li>
            <label className="field__label">Help text</label>
            <div className="field__controls">
              <textarea name="helpText" onChange={this.onChange} value={this.state.helpText} />
            </div>
          </li>
        </ul>
        {listEditor}
      </div>
    );
  }
}

export default FieldEditor;
