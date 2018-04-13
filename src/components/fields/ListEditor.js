import React, { Component } from 'react';

class ListEditor extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      items: this.props.options.items,
      showOther: this.props.options.showOther,
      listType: this.props.options.listType
    };

    this.onChange = this.onChange.bind(this);
    this.changeListType = this.changeListType.bind(this);
    this.toggleShowOther = this.toggleShowOther.bind(this);
  }

  changeListType(e) {
    let options = this.state.options;
    options.listType = e.target.value;
    this.setState({ options }, () => this.sendUpdates());
  }

  onChange(e, position) {
    e.preventDefault();
    let items = this.state.items;
    items[position] = e.target.value;
    this.setState({ items }, () => this.sendUpdates());
  }

  sendUpdates() {
    this.props.changeHandler({
      items: this.state.items,
      showOther: this.state.showOther,
      listType: this.state.listType
    });
  }

  toggleShowOther(e) {
    let showOther = !this.state.showOther;
    this.setState({ showOther }, () => this.sendUpdates());
  }

  render() {
    let key = Math.floor(Math.random() * 1000);
    let order = -1;
    return (
      <div className="field-set">
        <ul className="field-list">
          {this.state.items.map(item => {
            let position = order + 1;

            key++;
            order++;

            return (
              <li key={key}>
                <input type="text" onChange={(e) => this.onChange(e, position)} value={item} />
              </li>
            );
          })}
        </ul>
        <button onClick={this.addItem}>Add item</button>
        <ul className="field-list">
          <li>
            <label className="field__label">Include Other</label>
            <div className="field__controls">
              <input type="checkbox" name="showOther" onChange={this.toggleShowOther} />
            </div>
          </li>
          <li>
            <label className="field__label">List type</label>
            <div className="field__controls">
              <select value={this.state.listType} name="listType" onChange={this.changeListType}>
                <option value="dropdown">dropdown</option>
                <option value="radio">Radio</option>
                <option value="checklist">checklist</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ListEditor;
