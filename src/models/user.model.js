import DocModel from './doc.model';

export default class UserModel extends DocModel {

  constructor() {
    super();

    this.ref = this.db.collection('User');
    this._schema = {
      id: '',
      email: '',
      name: '',
      allowed: false
    };
  }
}
