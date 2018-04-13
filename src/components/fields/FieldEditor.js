import React, { Component } from 'react';

class FieldEditor extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      alias: this.props.field.alias,
      label: this.props.field.label,
      description: this.props.field.description,
      helpText: this.props.field.helpText ,
      type: this.props.field.type,
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let field = {};
    field[e.target.name] = e.target.value;
    this.setState(field, () => {
      this.props.changeHandler(this.state, this.props.order);
    });
  }

  render() {
    return (
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
    );
  }
}

export default FieldEditor;
