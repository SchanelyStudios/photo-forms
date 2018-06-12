import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AuthService } from '../services/auth';
import FormModel from '../models/form.model';
import SubmissionModel from '../models/submission.model';
import Spinner from './common/Spinner';


class DashboardPage extends Component {

  constructor() {
    super();
    this.formModel = new FormModel();
    this.submissionModel = new SubmissionModel();

    this.state = {
      forms: [],
      submissions: [],
      loadingForms: true,
      loadingSubmissions: true,
      authConfirmed: true,
      showArchived: false
    };
  }

  componentDidMount() {
    this.confirmAuth();
  }

  componentWillUnmount() {
    this.setState({
      forms: [],
      submissions: []
    });
  }

  async confirmAuth() {
    let authConfirmed = await AuthService.checkAuthedUser();
    this.setState({
      authConfirmed
    }, () => {
      this.getForms();
      this.getSubmissions();
    });
  }

  confirmToggleArchive(e, formId) {
    e.preventDefault();

    let confirmed = false;
    if (this.state.showArchived) {
      confirmed = true;
    } else {
      confirmed = window.confirm('Are you sure you want to archive this form and all its submissions? You can always recover them by switching Archives on.');
    }

    if (confirmed) {
      this.toggleForm(formId);
    }
  }

  async getForms() {
    let forms = await this.formModel.getList(['archived', '==', this.state.showArchived]);
    this.setState({
      forms,
      loadingForms: false
    });
  }

  async getSubmissions() {
    let orderBy = {
      field: 'dateStarted',
      direction: 'desc'
    };
    let submissions = await this.submissionModel.getList(['archived', '==', false], [orderBy]);
    this.setState({
      submissions,
      loadingSubmissions: false
    });
  }

  showActive() {
    this.setState({
      loadingForms: true,
      showArchived: false
    }, () => {
      this.getForms();
    });
  }

  showArchived() {
    this.setState({
      loadingForms: true,
      showArchived: true
    }, () => {
      this.getForms();
    });
  }

  showForms() {
    if (this.state.forms.length > 0) {
      return (
        <ul className="form-list plain">
          {this.state.forms.map(form => {
            let archiveOrNot = this.state.showArchived ? (
              <button
                className="btn btn--small btn--accent"
                onClick={(e) => this.confirmToggleArchive(e, form.id)}
              >
                <i className="icon icon--undo" title="Recover form" />
              </button>
            ) : (
              <button
                className="btn btn--small btn--danger"
                onClick={(e) => this.confirmToggleArchive(e, form.id)}
              >
                <i className="icon icon--trash" title="Archive form" />
              </button>
            );
            return (
              <li key={form.id}>
                <Link to={`/form/${form.id}/submissions`}>{form.name}</Link>
                {archiveOrNot}
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

  async toggleForm(formId) {

    let toggled;

    console.log('toggling form', formId);

    // If showing archived we should recover the selected submission
    if (this.state.showArchived) {
      toggled = await this.formModel.recover(formId);
    // Otherwise we archive it
    } else {
      toggled = await this.formModel.archive(formId);
    }

    // Make sure it indeed toggled before proceeding...
    if (!toggled) {
      console.log('not toggled');
      return false;
    }

    // Search for matching item
    let forms = this.state.forms;
    let position = 0;
    for (let form of forms) {
      if (form.id === formId) {
        console.log('matching form found', position);
        break;
      }
      position++;
    }

    // Now we remove it from the current list and update state
    forms.splice(position, 1);
    this.setState({ forms });
  }

  render() {

    if (!this.state.authConfirmed) {
      return (
        <Redirect to={'/login'} />
      );
    }

    let forms = this.showForms();
    let submissions = this.showSubmissions();

    let archivesOrNot = this.state.showArchived ? (
      <div className="btn-bar">
        <span className="link--ghost" onClick={(e) => this.showActive()}>
          <i className="icon icon--toggle-on"/> Archives on
        </span>
      </div>
    ) : (
      <div className="btn-bar">
        <span className="link--ghost" onClick={(e) => this.showArchived()}>
          <i className="icon icon--toggle-off" /> Archives off
        </span>
      </div>
    );

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
            {archivesOrNot}
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
