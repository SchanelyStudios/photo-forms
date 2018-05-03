import DocModel from './doc.model';

export default class FieldModel extends DocModel {

  constructor() {
    super();

    this.ref = this.db.collection('Field');
    this._schema = {
      id: '0',
      alias: '',
      label: '',
      type: 'singeline', // singleline, multiline
      description: '',
      helpText: '',
      optionsId: null,
      isFeatured: false
    };
  }
}
