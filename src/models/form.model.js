import DocModel from './doc.model';
import { FieldModel, ListFieldModel } from './field.model';

export default class FormModel extends DocModel {

  constructor() {
    super();

    this.ref = this.db.collection('Form');
    this._schema = {
      id: '',
      name: '',
      instructions: '',
      fields: []
    };

    this.fieldModel = new FieldModel();
    this.listFieldModel = new ListFieldModel();
  }

  sanitizeIn(data) {

    let validFields = [];
    for (let field of data.fields) {
      if (field.type === 'list') {
        validFields.push(this.listFieldModel.validate(field));
      } else {
        validFields.push(this.fieldModel.validate(field));
      }
    }

    data.fields = validFields;
    return data;
  }
}
