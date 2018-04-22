import React from 'react';
import OptionsModel from '../../models/options.model';

import DropdownList from './DropdownList';
import RadioList from './RadioList';
import CheckboxList from './CheckboxList';

class ListInput extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.onChange = this.onChange.bind(this);

    // this.values = this.props.value;

    this.model = new OptionsModel();

    this.state = {
      value: this.props.value,
      items: null,
      listType: null
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

    this.setState({
      items: optionsConfig.items,
      listType: optionsConfig.listType
    });
  }

  onChange(e, allowMultiple) {
    let value = e.target.value;
    let stateValue = this.state.value;
    if (allowMultiple) {
      // Toggle an existing item off
      if (stateValue.indexOf(value) >= 0) {
        stateValue.splice(stateValue.indexOf(value), 1);
      // or add this new value
      } else {
        stateValue.push(value);
      }
    } else {
      stateValue = value;
    }
    // e.preventDefault();
    this.setState({
      value: stateValue
    });
    this.props.onChange(this.props.name, stateValue);
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
            onChange={(e) => this.onChange(e, true)}
            index={index}
            name={this.props.name}
            items={this.state.items}
            checkedItems={this.state.value}
          />
        );
        break;
      case 'radio':
        listComponent = (
          <RadioList
            onChange={this.onChange}
            index={index}
            name={this.props.name}
            items={this.state.items}
            checkedItem={this.state.value}
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
          />
        );
        break;
    }
    return listComponent;
  }
}
export default ListInput;
