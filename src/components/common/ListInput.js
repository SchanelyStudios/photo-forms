import React from 'react';

class ListInput extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: this.props.value
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="field-control">
        <select onChange={this.onChange}>
          <option>Test 1</option>
          <option>Test 2</option>
          <option>Test 3</option>
        </select>
      </div>
    );
  }
}
export default ListInput;
