import DocModel from './doc.model';

import dashify from 'dashify';

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

  sanitizeIn(data) {
    if (data.label.length < 1) {
      data.label = 'New field ' + Math.floor(Math.random() * 1000);
    }

    if (data.alias.length < 1) {
      data.alias = dashify(data.label);
    } else {
      data.alias = dashify(data.alias);
    }

    return data;
  }
}
