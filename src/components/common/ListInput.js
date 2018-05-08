import React from 'react';
import OptionsModel from '../../models/options.model';

import DropdownList from './DropdownList';
import RadioList from './RadioList';
import CheckboxList from './CheckboxList';

class ListInput extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.onChange = this.onChange.bind(this);

    this.model = new OptionsModel();
    this.updatingOther = false;

    this.state = {
      value: this.props.value,
      items: null,
      listType: null,
      showOther: false
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.optionsId) {
      this.getOptions(this.props.optionsId);
    }
  }

  async getOptions(){
    let optionsConfig = await this.model.get(this.props.optionsId);

    let value = this.state.value;

    if (optionsConfig.listType === 'checkbox' && value === '') {
      value = [];
    }

    this.setState({
      items: optionsConfig.items,
      listType: optionsConfig.listType,
      showOther: optionsConfig.showOther,
      value
    });
  }

  onChange(value, allowMultiple, priorValue) {
    let stateValue = this.state.value;
    if (allowMultiple) {
      // Toggle an existing item off
      if (stateValue.indexOf(value) >= 0) {
        stateValue.splice(stateValue.indexOf(priorValue), 1);
      // or add this new value// Deal with an editable value changing...
      } else if (priorValue && stateValue.indexOf(priorValue) >= 0) {
        stateValue.splice(stateValue.indexOf(priorValue), 1);
        if (value.length > 0) {
          stateValue.push(value);
        }
      } else if (value.length > 0) {
        stateValue.push(value);
      }
    } else {
      stateValue = value;
    }

    // Pause child updating if update other (presence of priorValue)
    if (priorValue !== undefined && priorValue !== null) {
      this.updatingOther = true;
    }

    this.setState({
      value: stateValue
    });
    this.props.onChange(this.props.name, stateValue);
  }

  shouldComponentUpdate() {
    if (this.updatingOther) {
      this.updatingOther = false;
      return false;
    }
    return true;
  }

  render() {
    if (this.state.items === null || this.state.listType === null) {
      return (
        <p>Loading options...</p>
      );
    }

    let index = Math.floor(Math.random() * 1000);

    let listComponent = '';
    switch (this.state.listType) {
      case 'checkbox':
        listComponent = (
          <CheckboxList
            onChange={(value, priorValue) => this.onChange(value, true, priorValue)}
            index={index}
            name={this.props.name}
            items={this.state.items}
            checkedItems={this.state.value}
            showOther={this.state.showOther}
          />
        );
        break;
      case 'radio':
        listComponent = (
          <RadioList
            onChange={(value, priorValue) => this.onChange(value, false, priorValue)}
            index={index}
            name={this.props.name}
            items={this.state.items}
            checkedItem={this.state.value}
            showOther={this.state.showOther}
          />
        );
        break;
      case 'dropdown':
      default:
        listComponent = (
          <DropdownList
            onChange={this.onChange}
            index={index}
            name={this.props.name}
            items={this.state.items}
            selectedItem={this.state.value}
            showOther={this.state.showOther}
          />
        );
        break;
    }
    return listComponent;
  }
}
export default ListInput;
