import React, { Component } from 'react';

class ListItemEditor extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      item: this.props.item
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      item: e.target.value
    }, this.props.changeHandler(this.props.order, e.target.value));
  }

  render() {
    return (
      <input type="text" onChange={this.onChange} value={this.state.item} />
    );
  }
}

export default ListItemEditor;
