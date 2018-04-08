import React from 'react';

class MultilineInput extends React.Component {

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
        <textarea onChange={this.onChange}>{this.state.value}</textarea>
      </div>
    );
  }
}
export default MultilineInput;
