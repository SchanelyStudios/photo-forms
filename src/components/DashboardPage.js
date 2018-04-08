import React, { Component } from 'react';
import FormModel from '../models/form.model';

class DashboardPage extends Component {

  constructor() {
    super();
    this.model = new FormModel();

    this.state = {
      forms: [],
      form: null
    };
  }

  componentDidMount() {
    this.getForms();
  }

  componentWillUnmount() {
    this.setState({ forms: [] });
  }

  async getForms() {
    let forms = await this.model.getList();
    this.setState({ forms });
  }

  async getForm(id) {
    let form = await this.model.get(id);
    this.setState({ form });
  }

  changeForm(id) {
    this.getForm(id);
  }

  showForm(form) {
    let fields = '';
    if (form.fields) {
      fields = (
        <ul>
          {form.fields.map(field => (
            <li key={field.alias}>
              <h4>{field.label} [{field.type}]</h4>
              <p>{field.description}</p>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="form-preview">
        <h3>{form.name}</h3>
        <p>{form.instructions}</p>
        {fields}
      </div>
    );
  }

  render() {
    let form = (this.state.form !== null) ? this.showForm(this.state.form) : '';

    return (
      <main>
        <h2>Welcome!</h2>
        <p>
          This applicaiton is currently under development.
          Check back again soon!
        </p>
        <div className="dashboard">
          <ul className="form-list">
            {this.state.forms.map(form => {
              return (
                <li key={form.id} onClick={() => this.changeForm(form.id)}>{form.name}</li>
              );
            })}
          </ul>
          {form}
        </div>
      </main>
    );
  }
}
export default DashboardPage;
