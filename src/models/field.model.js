import DocModel from './doc.model';

export class FieldModel extends DocModel {

  constructor() {
    super();

    this.ref = null;
    this._schema = {
      alias: '',
      label: '',
      type: 'singeline', // singleline, multiline
      description: '',
      helpText: '',
    };
  }
}

export class ListFieldModel extends FieldModel {
  constructor() {
    super();

    this.ref = null;
    this._schema = {
      alias: '',
      label: '',
      type: 'list', // list
      description: '',
      helpText: '',
      optionsId: 0,
      includeOther: false
    };
  }
}

export class OptionsModel extends DocModel {
  constructor() {
    super();

    this.ref = this.db.collection('Options');
    this._schema = {
      showOther: false,
      listType: 'dropdown',
      items: []
    };
  }
}
