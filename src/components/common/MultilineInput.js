import React from 'react';

class MultilineInput extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: this.props.value
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({
      value
    });
    this.props.onChange(this.props.name, value);
  }

  render() {
    return (
      <textarea
        name={this.props.name}
        onChange={this.onChange}
        value={this.state.value}
      />
    );
  }
}
export default MultilineInput;
