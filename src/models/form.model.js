import DocModel from './doc.model';
import FieldModel from './field.model';
import SubmissionModel from './submission.model';

export default class FormModel extends DocModel {

  constructor() {
    super();

    this.ref = this.db.collection('Form');
    this._schema = {
      id: '',
      name: '',
      instructions: '',
      fields: [],
      archived: false
    };

    this.fieldModel = new FieldModel();
  }

  archive(id) {
    let submissionModel = new SubmissionModel();
    return this.ref.doc(id).update({
      archived: true
    }).then(function() {
      submissionModel.archiveForForm(id);
      return true;
    }).catch(function(error) {
      console.error("Error updating document: ", error);
      return false;
    });
  }

  // TODO: Add ability to recover to UI
  recover(id) {
    let submissionModel = new SubmissionModel();
    return this.ref.doc(id).update({
      archived: false
    }).then(function() {
      submissionModel.recoverForForm(id);
      return true;
    }).catch(function(error) {
      console.error("Error updating document: ", error);
      return false;
    });
  }

  async getFullForm(id) {
    let form = await this.get(id);

    let fullFields = [];
    for (let fieldId of form.fields) {
      let fullField = await this.fieldModel.get(fieldId);
      fullFields.push(fullField);
    }

    form.fields = fullFields;

    return form;
  }

  getEmailFieldSettings() {
    let field = this.fieldModel.getEmpty();
        field.label = 'Your email';
        field.description = 'Provide an email address which we can use to follow up with you.';
        field.alias = 'email';
    return field;
  }
}
