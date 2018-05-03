import 'datejs';

import DocModel from './doc.model';
import FormModel from './form.model';

export default class SubmissionModel extends DocModel {

  constructor() {
    super();

    this.formModel = new FormModel();

    this.ref = this.db.collection('Submission');
    this._schema = {
      id: '',
      email: '',
      dateStarted: '',
      dateUpdated: '',
      form: {
        id: 0,
        name: ''
      },
      values: {}
    };
  }

  async get(id) {
    let sub = await super.get(id);
    let form = await this.formModel.get(sub.form.id);
    sub.form = {
      id: form.id,
      name: form.name
    };
    return sub;
  }

  getForForm(formId) {
    return this.getList(['form.id', '==', formId]);
  }

  sanitizeIn(data) {
    if (data.dateStarted) {
      data.dateStarted = Date.parse(data.dateStarted).toString();
    }
    if (data.dateUpdated) {
      data.dateUpdated = Date.parse(data.dateUpdated).toString();
    }
    if (data.form) {
      if (typeof data.form === String) {
        data.form = {
          id: data.form,
          name: 'Name not saved'
        }
      }
    }
    return data;
  }

  sanitizeOut(data) {
    data.dateStarted = Date.parse(data.dateStarted).toString('MMM d, yyyy');
    data.dateUpdated = Date.parse(data.dateUpdated).toString('MMM d, yyyy');
    if (data.form) {
      if (typeof data.form === 'string') {
        data.form = {
          id: data.form,
          name: 'Name not saved'
        }
      }
    }
    return data;
  }
}
