import DocModel from './doc.model';

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

  sanitizeOut(data) {
    console.log(data);
    data.dateStarted = moment(data.dateStarted).format('MMM D, Y');
    data.dateUpdated = moment(data.dateUpdated).format('MMM D, Y');
    return data;
  }
}
