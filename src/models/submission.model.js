import DocModel from './doc.model';

export default class SubmissionModel extends DocModel {

  constructor() {
    super();

    this.ref = this.db.collection('Submission');
    this._schema = {
      id: '',
      email: '',
      dateStarted: '',
      dateSubmitted: '',
      form: '',
      values: {}
    };
  }
}
