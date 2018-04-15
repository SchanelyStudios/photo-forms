import DocModel from './doc.model';
import moment from 'moment';

export default class SubmissionModel extends DocModel {

  constructor() {
    super();

    this.ref = this.db.collection('Submission');
    this._schema = {
      id: '',
      email: '',
      dateStarted: '',
      dateUpdated: '',
      form: '',
      values: {}
    };
  }

  getForForm(formId) {
    return this.getList(['form', '==', formId]);
  }

  sanitizeIn(data) {
    if (data.dateStarted) {
      data.dateStarted = moment(data.dateStarted).toDate();
    }
    if (data.dateUpdated) {
      data.dateUpdated = moment(data.dateUpdated).toDate();
    }
    return data;
  }

  sanitizeOut(data) {
    data.dateStarted = moment(data.dateStarted).format('MMM D, Y');
    data.dateUpdated = moment(data.dateUpdated).format('MMM D, Y');
    return data;
  }
}
