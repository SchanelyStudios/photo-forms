import React, { Component } from 'react';
import FormModel from '../models/form.model';
import SubmissionModel from '../models/submission.model';
import Spinner from './common/Spinner';

import { Link } from 'react-router-dom';

class DashboardPage extends Component {

  constructor() {
    super();
    this.formModel = new FormModel();
    this.submissionModel = new SubmissionModel();

    this.state = {
      forms: [],
      submissions: [],
      loadingForms: true,
      loadingSubmissions: true
    };
  }

  componentDidMount() {
    this.getForms();
    this.getSubmissions();
  }

  componentWillUnmount() {
    this.setState({
      forms: [],
      submissions: []
    });
  }

  async getForms() {
    let forms = await this.formModel.getList();
    this.setState({
      forms,
      loadingForms: false
    });
  }

  async getSubmissions() {
    let submissions = await this.submissionModel.getList();
    this.setState({
      submissions,
      loadingSubmissions: false
    });
  }

  showForms() {
    if (this.state.forms.length > 0) {
      return (
        <ul className="form-list table-list plain">
          {this.state.forms.map(form => {
            return (
              <li key={form.id}>
                <Link to={`/form/${form.id}/submissions`}>{form.name}</Link>
              </li>
            );
          })}
        </ul>
      );
    } else if (this.state.loadingForms) {
      return (
        <Spinner>Loading forms...</Spinner>
      );
    }

    return (
      <p>No forms found</p>
    );
  }

  showSubmissions() {
    if (this.state.submissions.length > 0) {
      return (
        <ul className="submission-list table-list plain">
          {this.state.submissions.map(sub => {
            return (
              <li key={sub.id}>
                <Link to={`/submission/${sub.id}`}>
                  <span className="submission__formName">{sub.form.name}</span>
                  <span className="submission__email">{sub.email}</span>
                  <span className="submission__date">{sub.dateStarted}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      );
    } else if (this.state.loadingSubmissions) {
      return (
        <Spinner>Loading submissions...</Spinner>
      );
    }

    return (
      <p>No submissions found</p>
    );
  }

  render() {
    let forms = this.showForms();
    let submissions = this.showSubmissions();
    return (
      <main className="dashboard flex-tile">
        <div className="dashboard__recent-submissions box-g0">
          <div className="control-bar">
            <h2>Recent Submissions</h2>
          </div>
          {submissions}
        </div>
        <div className="dashboard__forms box-g1">
          <div className="control-bar">
            <h2>
              Forms
            </h2>
            <div className="btn-bar">
              <Link className="btn btn--success btn--small" to={'/form/0/edit'}>
                <i className="icon icon--add" />
              </Link>
            </div>
          </div>
          {forms}
        </div>
      </main>
    );
  }
}
export default DashboardPage;
