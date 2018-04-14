import DocModel from './doc.model';
import FieldModel from './field.model';

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
  }

  // sanitizeIn(data) {
  //
  //   let validFields = [];
  //   for (let field of data.fields) {
  //     validFields.push(this.fieldModel.validate(field));
  //   }
  //
  //   data.fields = validFields;
  //   return data;
  // }
}
