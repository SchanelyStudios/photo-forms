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
      values: {},
      archived: false
    };
  }

  archive(id) {
    return this.ref.doc(id).update({
      archived: true
    }).then(function() {
        return true;
    }).catch(function(error) {
        console.error("Error updating document: ", error);
        return false;
    });
  }

  // TODO: Add ability to recover to UI
  recover(id) {
    return this.ref.doc(id).update({
      archived: false
    }).then(function() {
        return true;
    }).catch(function(error) {
        console.error("Error updating document: ", error);
        return false;
    });
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

  getForForm(formId, showArchived) {
    // Ensure showArchived is a boolean
    showArchived = !!showArchived;
    let filters = this.ref.where('form.id', '==', formId).where('archived', '==', showArchived);
    return this.getList(filters);
  }

  sanitizeIn(data) {
    if (data.dateStarted) {
      data.dateStarted = Date.parse(data.dateStarted).valueOf();
    }
    if (data.dateUpdated) {
      data.dateUpdated = Date.parse(data.dateUpdated).valueOf();
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
    let startDate = new Date(data.dateStarted);
    let updateDate = new Date(data.dateUpdated);
    data.dateStarted = startDate.toString('MMM d, yyyy');
    data.dateUpdated = updateDate.toString('MMM d, yyyy');
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
