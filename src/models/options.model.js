import DocModel from './doc.model';

export default class OptionsModel extends DocModel {
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
