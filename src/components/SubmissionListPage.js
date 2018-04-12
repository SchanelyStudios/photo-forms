import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubmissionModel from '../models/submission.model';
import FormModel from '../models/form.model';

class SubmissionListPage extends Component {

  constructor(props, state) {
    super(props, state);
    this.submissionModel = new SubmissionModel();
    this.formModel = new FormModel();
    this.formId = this.props.match ? this.props.match.params.formId : null;
    this.state = {
      form: null,
      submissions: [],
      loadingForm: true,
      loadingSubmissions: true
    };
  }

  componentDidMount() {
    if (this.formId !== null) {
      this.getFormSubmissions();
    } else {
      this.setState({
        loading: false
      });
    }
  }

  getFormSubmissions() {
    this.formModel.get(this.formId).then(form => {
      this.setState({
        form,
        loadingForm: false
      });
    });

    this.submissionModel.getForForm(this.formId).then(submissions => {
      this.setState({
        submissions,
        loadingSubmissions: false
      });
    });
  }

  prepareCells(values) {
    let cells = [];
    for (let label in values) {
      let value = values[label];
      if (value instanceof Array) {
        value = value.join(', ');
      }
      cells.push({
        key: label,
        value
      });
    }
    return cells;
  }

  showForm() {
    if (this.state.loadingForm) {
      return (
        <p>Loading form...</p>
      );
    } else if (this.state.form === null) {
      return (
        <p>No form found.</p>
      );
    }

    let form = this.state.form;
    return (
      <h2>
        {form.name}
        <Link to={`/form/${form.id}`}>View/Add entry</Link>
        <Link to={`/form/${form.id}/edit`}>Edit</Link>
      </h2>
    );
  }

  showSubmissions() {
    if (this.state.loadingSubmissions) {
      return (
        <p>Loading submissions...</p>
      );
    } else if (this.state.submissions.length === 0) {
      return (
        <p>No submissions found.</p>
      );
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Started</th>
            <th>Updated</th>
            {this.state.form.fields.map(field => (
              <th key={field.alias}>{field.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.submissions.map(sub => {
            let cells = this.prepareCells(sub.values);
            return (
              <tr key={sub.id}>
                <td>{sub.email}</td>
                <td>{sub.dateStarted}</td>
                <td>{sub.dateUpdated}</td>
                {cells.map(cell => (
                  <td key={cell.key}>{cell.value}</td>
                ))}
                <td><Link to={`/submission/${sub.id}`}>View</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <main>
        {this.showForm()}
        {this.showSubmissions()}
      </main>
    );
  }
}

export default SubmissionListPage;
