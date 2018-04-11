import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './components/App';
import DashboardPage from './components/DashboardPage';
import ViewFormPage from './components/ViewFormPage';
import ViewSubmissionPage from './components/ViewSubmissionPage';
import EditFormPage from './components/EditFormPage';
import EditSubmissionPage from './components/EditSubmissionPage';
import SubmissionListPage from './components/SubmissionListPage';
import LoginPage from './components/LoginPage';

import { UserModel } from './models/user.model';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let userIsAuthenticated = UserModel.isAuthenticated();
  return (
    <Route {...rest} render={(props) => (
      userIsAuthenticated === true
        ? <Component {...props} />
        : <Redirect to="/login" />
      )}
    />
  );
};

export default (
  <App>
    <PrivateRoute path="/" exact={true} component={DashboardPage} />
    <Route path="/login" exact={true} component={LoginPage} />
    <Route path="/form/:formId" exact={true} component={ViewFormPage} />
    <PrivateRoute path="/form/:formId/edit" exact={true} component={EditFormPage} />
    <PrivateRoute path="/form/:formId/submissions" exact={true} component={SubmissionListPage} />
    <Route path="/submission/:submissionId" exact={true} component={ViewSubmissionPage} />
    <Route path="/submission/:submissionId/edit" exact={true} component={EditSubmissionPage} />
  </App>
);
