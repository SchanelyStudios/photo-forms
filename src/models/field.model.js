export class FieldModel {

  _schema = {
    alias: '',
    label: '',
    type: '', // single, multi, lists
    description: '',
    helpText: '',
  };
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
