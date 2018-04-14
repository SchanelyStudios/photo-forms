import React, { Component } from 'react';
import ListItemEditor from './ListItemEditor';

class ListEditor extends Component {

  constructor(props, state) {
    super(props, state);

    this.updatingListItem = false;

    this.state = {
      items: this.props.options.items,
      showOther: this.props.options.showOther,
      listType: this.props.options.listType
    };

    this.onListItemChange = this.onListItemChange.bind(this);
    this.changeListType = this.changeListType.bind(this);
    this.toggleShowOther = this.toggleShowOther.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    let items = this.state.items;
    items.push('');
    this.setState({
      items
    });
  }

  changeListType(e) {
    this.setState({
      listType: e.target.value
    }, () => this.sendUpdates());
  }

  onListItemChange(position, value) {
    let items = this.state.items;
    items[position] = value;
    this.updatingListItem = true;
    this.setState({ items }, () => this.sendUpdates());
  }

  sendUpdates() {
    this.props.changeHandler({
      items: this.state.items,
      showOther: this.state.showOther,
      listType: this.state.listType
    });
  }

  removeItem(e, position) {
    e.preventDefault();
    let items = this.state.items;
    items.splice(position, 1);
    this.setState({
      items
    });
  }

  shouldComponentUpdate() {
    if (this.updatingListItem) {
      this.updatingListItem = false;
      return false;
    } else {
      return true;
    }
  }

  toggleShowOther(e) {
    let showOther = !this.state.showOther;
    this.setState({ showOther }, () => this.sendUpdates());
  }

  render() {
    let key = Math.floor(Math.random() * 1000);
    let order = -1;
    return (
      <ul className="field-list">
        <li>
          <label className="field__label">List type</label>
          <div className="field__controls">
            <select value={this.state.listType} name="listType" onChange={this.changeListType}>
              <option value="dropdown">Dropdown</option>
              <option value="radio">Radio</option>
              <option value="checklist">Checklist</option>
            </select>
          </div>
        </li>
        <li>
          <label className="field__label">List items</label>
          <div className="field__controls">
            <ul className="control-list">
              {this.state.items.map(item => {
                key++;
                order++;
                let position = order;
                return (
                  <li key={key}>
                    <ListItemEditor
                      key={key}
                      order={position}
                      item={item}
                      changeHandler={this.onListItemChange}
                    />
                  <button onClick={(e) => this.removeItem(e, position)}>&times;</button>
                  </li>
                );
              })}
            </ul>
            <button onClick={this.addItem}>Add item</button>
          </div>
        </li>
        <li>
          <label className="field__label">Include Other</label>
          <div className="field__controls">
            <input
              type="checkbox"
              name="showOther"
              checked={this.state.showOther}
              onChange={this.toggleShowOther}
            />
          </div>
        </li>
      </ul>
    );
  }
}

export default ListEditor;
