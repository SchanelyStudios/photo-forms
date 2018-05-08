import React, { Component } from 'react';

class CheckboxList extends Component {

  state = {
    other: '',
    otherChecked: false
  }

  constructor(props, state) {
    super(props, state);

    this.changeOther = this.changeOther.bind(this);
    this.toggleOther = this.toggleOther.bind(this);
  }

  componentDidMount() {
    if (this.props.showOther) {
      // Search for an "other" option
      let otherChecked = false;
      let other = '';
      for (let checkedItem of this.props.checkedItems) {
        if (this.props.items.indexOf(checkedItem) < 0) {
          otherChecked = true;
          other = checkedItem;
          break;
        }
      }

      this.setState({
        otherChecked,
        other
      });
    }
  }

  changeOther(e) {
    e.preventDefault();
    let priorValue = this.state.other;
    let value = e.target.value;
    let otherChecked = (value.length > 0);
    this.setState({
      other: value,
      otherChecked
    }, () => {
      this.props.onChange(value, priorValue);
    });
  }

  toggleOther(e) {
    let priorValue = this.state.other;
    let otherChecked = this.state.otherChecked ? false : true;
    this.setState({
      otherChecked
    }, () => {
      this.props.onChange(this.state.other, priorValue);
    });
  }

  showOther(key) {
    if (!this.props.showOther) {
      return '';
    }
    return (
      <li key={key} className="field-list__item field-list__item--other">
        <input
            checked={this.state.otherChecked}
            onChange={this.toggleOther}
            type="checkbox"
            name={this.props.name}
            value={this.state.other}
        />
        <label className="input-label input-label__checkbox">Other:</label>
        <input type="text" onChange={this.changeOther} value={this.state.other} />
      </li>
    );
  }

  render() {
    let key = this.props.index;
    let other = this.showOther(key);

    return (
      <ul className="field-list field-list--checkbox">
        {this.props.items.map(item => {
          key++;
          let checked = (this.props.checkedItems.indexOf(item) >= 0) ? true : false;
          return (
            <li key={key} className="field-list__item">
              <input
                checked={checked}
                onChange={(e) => this.props.onChange(e.target.value)}
                type="checkbox"
                name={this.props.name}
                value={item}
              />
              <label className="input-label input-label__checkbox">{item}</label>
            </li>
          );
        })}
        {other}
      </ul>
    );
  }
}
export default CheckboxList;
