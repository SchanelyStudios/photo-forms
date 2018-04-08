import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import DashboardPage from './components/DashboardPage';
import ViewFormPage from './components/ViewFormPage';
import ViewSubmissionPage from './components/ViewSubmissionPage';
import EditFormPage from './components/EditFormPage';
import EditSubmissionPage from './components/EditSubmissionPage';
import SubmissionListPage from './components/SubmissionListPage';

export default (
  <App>
    <Route path="/" exact={true} component={DashboardPage} />
    <Route path="/form/:formId" exact={true} component={ViewFormPage} />
    <Route path="/form/:formId/edit" exact={true} component={EditFormPage} />
    <Route path="/form/:formId/submissions" exact={true} component={SubmissionListPage} />
    <Route path="/submission/:submissionId" exact={true} component={ViewSubmissionPage} />
    <Route path="/submission/:submissionId/edit" exact={true} component={EditSubmissionPage} />
  </App>
);
