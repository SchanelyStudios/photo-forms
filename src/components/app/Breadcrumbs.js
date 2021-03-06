import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../../services/auth';

class Breadcrumbs extends Component {

  userIsAuthenticated = AuthService.isAuthenticated();

  render() {
    if (!this.userIsAuthenticated) {
      return ('');
    }

    let key = Math.round(Math.random() * 1000);

    return (
      <ul className="breadcrumbs">
        <li><Link to={'/'}>Dashboard</Link></li>
        {this.props.paths.map(item => {
          key++;
          return (
            <li key={key}><Link to={item.path}>{item.label}</Link></li>
          );
        })}
        <li>{this.props.current}</li>
      </ul>
    );
  }
}

export default Breadcrumbs;
