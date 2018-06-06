import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubmissionModel from '../models/submission.model';
import FormModel from '../models/form.model';

import Spinner from './common/Spinner';
import Breadcrumbs from './app/Breadcrumbs';

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

  confirmDelete(submissionId) {
    let confirmed = window.confirm('Are you sure? It will take your developer some extra work if you decide you want to recover this...');
    if (confirmed) {
      this.deleteSubmission(submissionId);
    }
  }

  async deleteSubmission(submissionId) {
    console.log('clicked to delete submission', submissionId);
    await this.submissionModel.archive(submissionId);
    let submissions = this.state.submissions;
    let position = 0;
    for (let sub of submissions) {
      if (sub.id === submissionId) {
        break;
      }
      position++;
    }
    console.log('removed submission in position', position);
    submissions.splice(position, 1);
    this.setState({ submissions });
  }

  async getFormSubmissions() {
    this.formModel.getFullForm(this.formId).then(form => {
      this.setState({
        form,
        loadingForm: false
      });
    });

    this.submissionModel.getForForm(this.formId).then(submissions => {
      return this.setState({
        submissions,
        loadingSubmissions: false
      });
    });
  }

  showForm() {
    if (this.state.loadingForm) {
      return (
        <Spinner>Loading form...</Spinner>
      );
    } else if (this.state.form === null) {
      return (
        <p>No form found.</p>
      );
    }

    let form = this.state.form;
    return (
      <div className="control-bar">
        <h2>
          {form.name}
        </h2>
        <div className="btn-bar">
          <Link to={`/form/${form.id}`} className="btn btn--nav btn--small">
            <i className="icon icon--eye" />
          </Link>
          <Link to={`/form/${form.id}/edit`} className="btn btn--caution btn--small">
            <i className="icon icon--edit" />
          </Link>
        </div>
      </div>
    );
  }

  showSubmissions() {
    if (this.state.loadingSubmissions || this.state.loadingForm) {
      return (
        <Spinner>Loading submissions...</Spinner>
      );
    } else if (this.state.submissions.length === 0) {
      return (
        <p>No submissions found.</p>
      );
    }

    let featuredFields = [];

    return (
      <table className="submission-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Started</th>
            <th>Updated</th>
            {this.state.form.fields.map(field => {
              if (!field.isFeatured) {
                return null;
              }
              featuredFields.push(field.alias);
              return (
                <th key={field.alias}>{field.label}</th>
              );
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.submissions.map(sub => {
            return (
              <tr key={sub.id}>
                <td>{sub.email}</td>
                <td>{sub.dateStarted}</td>
                <td>{sub.dateUpdated}</td>
                {featuredFields.map(alias => {
                  if (sub.values[alias]) {
                    let value = sub.values[alias];
                    if (value instanceof Array) {
                      value = value.join(', ');
                    }
                    return (
                      <td key={`${sub.id}-${alias}`}>{value}</td>
                    );
                  }
                  return null;
                })}
                <td>
                  <Link to={`/submission/${sub.id}`}>View</Link>
                  <span onClick={(e) => this.confirmDelete(sub.id)}>Delete</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    let form = this.state.form ? this.state.form.name : '';
    return (
      <main>
        <Breadcrumbs paths={[]} current={form}/>
        {this.showForm()}
        {this.showSubmissions()}
      </main>
    );
  }
}

export default SubmissionListPage;
