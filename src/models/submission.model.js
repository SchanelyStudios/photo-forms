import firebase from './firebase';

export default class SubmissionModel {

  _schema = {
    id: '',
    email: '',
    dateStarted: '',
    dateSubmitted: '',
    form: '',
    values: {}
  };

  get(id) {
    // TODO: Develop get method
  }

  getList() {
    // TODO: Develop get list method
  }
}
