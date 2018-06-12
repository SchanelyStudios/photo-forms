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
      loadingSubmissions: true,
      showArchived: false
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

  confirmToggleArchive(submissionId) {
    let confirmed = false;
    if (this.state.showArchived) {
      confirmed = true;
    } else {
      confirmed = window.confirm('Are you sure you want to archive this item? You can always recover it by switching Archives on.');
    }
    if (confirmed) {
      this.toggleSubmission(submissionId);
    }
  }

  async getFormSubmissions() {
    if (this.state.loadingForm) {
      this.formModel.getFullForm(this.formId).then(form => {
        this.setState({
          form,
          loadingForm: false
        });
      });
    }

    this.submissionModel.getForForm(this.formId, this.state.showArchived).then(submissions => {
      return this.setState({
        submissions,
        loadingSubmissions: false
      });
    });
  }

  showActive() {
    this.setState({
      loadingSubmissions: true,
      showArchived: false
    }, () => {
      this.getFormSubmissions();
    });
  }

  showArchived() {
    this.setState({
      loadingSubmissions: true,
      showArchived: true
    }, () => {
      this.getFormSubmissions();
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
      <div className="control-bar">
        <h2>
          {form.name}
        </h2>
        {archivesOrNot}
        <div className="btn-bar">
          <Link to={`/form/${form.id}`} className="btn btn--nav btn--small">
            <i className="icon icon--share" title="View form and get shareable URL" />
          </Link>
          <Link to={`/form/${form.id}/edit`} className="btn btn--caution btn--small">
            <i className="icon icon--edit" title="Edit form settings" />
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
            let archiveOrNot = this.state.showArchived ? (
              <button
                className="btn btn--small btn--accent"
                onClick={(e) => this.confirmToggleArchive(sub.id)}
              >
                <i className="icon icon--undo" title="Recover submission" />
              </button>
            ) : (
              <button
                className="btn btn--small btn--danger"
                onClick={(e) => this.confirmToggleArchive(sub.id)}
              >
                <i className="icon icon--trash" title="Archive submission" />
              </button>
            );
            return (
              <tr className="item" key={sub.id}>
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
                <td className="item__options">
                  <Link to={`/submission/${sub.id}`}>View</Link>
                  {archiveOrNot}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  async toggleSubmission(submissionId) {
    let toggled;

    // If showing archived we should recover the selected submission
    if (this.state.showArchived) {
      toggled = await this.submissionModel.recover(submissionId);
    // Otherwise we archive it
    } else {
      toggled = await this.submissionModel.archive(submissionId);
    }

    // Make sure it indeed toggled before proceeding...
    if (!toggled) {
      return false;
    }

    // Search for matching item
    let submissions = this.state.submissions;
    let position = 0;
    for (let sub of submissions) {
      if (sub.id === submissionId) {
        break;
      }
      position++;
    }

    // Now we remove it from the current list and update state
    submissions.splice(position, 1);
    this.setState({ submissions });
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
