import firebase from './firebase';

export class FieldModel {

  _schema = {
    alias: '',
    label: '',
    type: '', // single, multi, lists
    description: '',
    helpText: '',
  };

  get(id) {
    // TODO: Develop get method
  }

  getList() {
    // TODO: Develop get list method
  }
}

export class ListField extends Field {
  _schema = {
    alias: '',
    label: '',
    type: '', // radio, checkbox, dropdown
    description: '',
    helpText: '',
    options: [],
    includeOther: false
  };

  // TODO: Add overrides as needed.
}
