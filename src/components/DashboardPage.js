import React, { Component } from 'react';
import FormModel from '../models/form.model';
import SubmissionModel from '../models/submission.model';

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
        <ul className="form-list">
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
        <p>Loading forms...</p>
      );
    }

    return (
      <p>No forms found</p>
    );
  }

  showSubmissions() {
    if (this.state.submissions.length > 0) {
      return (
        <ul className="submission-list">
          {this.state.submissions.map(sub => {
            return (
              <li key={sub.id}>
                <Link to={`/submission/${sub.id}`}>{sub.dateStarted}</Link>
              </li>
            );
          })}
        </ul>
      );
    } else if (this.state.loadingSubmissions) {
      return (
        <p>Loading submissions...</p>
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
      <main>
        <h2>Welcome!</h2>
        <p>
          This applicaiton is currently under development.
          Check back again soon!
        </p>
        <div className="dashboard">
          <div className="dashboard__recent-submissions">
            <h2>Recent Submissions</h2>
            {submissions}
          </div>
          <div className="dashboard__forms">
            <h2>Forms <Link to={'/form/0/edit'}>+ New form</Link></h2>
            {forms}
          </div>
        </div>
      </main>
    );
  }
}
export default DashboardPage;
