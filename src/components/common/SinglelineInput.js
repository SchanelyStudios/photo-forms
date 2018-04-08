import React from 'react';

class SinglineInput extends React.Component {

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
        <input type="text" value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
export default SinglineInput;
