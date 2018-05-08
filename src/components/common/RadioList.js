import React, { Component } from 'react';

class RadioList extends Component {

  state = {
    other: '',
    otherSelected: false
  }

  constructor(props, state) {
    super(props, state);

    this.changeOther = this.changeOther.bind(this);
    this.toggleOther = this.toggleOther.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  componentDidMount() {
    if (this.props.showOther) {
      // Search for an "other" option
      let otherSelected = false;
      let other = '';
      if (this.props.items.indexOf(this.props.checkedItem) < 0) {
        otherSelected = true;
        other = this.props.checkedItem;
      }

      this.setState({
        otherSelected,
        other
      });
    }
  }

  changeItem(e) {
    let value = e.target.value;
    this.setState({
      otherSelected: false
    }, () => {
      this.props.onChange(value);
    })
  }

  changeOther(e) {
    e.preventDefault();
    let priorValue = this.state.other;
    let value = e.target.value;
    let otherSelected = (value.length > 0);
    this.setState({
      other: value,
      otherSelected
    }, () => {
      this.props.onChange(value, priorValue);
    });
  }

  toggleOther(e) {
    this.setState({
      otherSelected: true
    });
    this.props.onChange(e.target.value);
  }

  showOther(key) {
    if (!this.props.showOther) {
      return '';
    }
    return (
      <li key={key} className="field-list__item field-list__item--other">
        <input
            checked={this.state.otherSelected}
            onChange={this.toggleOther}
            type="radio"
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
      <ul className="field-list field-list--radio">
        {this.props.items.map(item => {
          let checked = item === this.props.checkedItem ? true : false;
          key++;
          return (
            <li key={key}>
              <input
                type="radio"
                checked={checked}
                onChange={this.changeItem}
                name={this.props.name}
                value={item}
                />
              <label className="input-label input-label__radio">{item}</label>
            </li>
          );
        })}
        {other}
      </ul>
    );
  }
}
export default RadioList;
