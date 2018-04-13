import firebase from './firebase';

export default class DocModel {

  db;
  ref;
  _schema;

  constructor() {
    this.db = firebase.firestore();
  }

  get(id) {
    if (!this.ref) {
      return null;
    }
    return this.ref.doc(id).get()
      .then(doc => {
          if (!doc.exists) {
              console.error('No such document!', id);
              return null;
          } else {
              let value = this.tidy(doc);
              value = this.sanitizeOut(value);
              return value;
          }
      })
      .catch(err => {
          console.error('Error getting document', err);
      });
  }

  getEmpty() {
    let model = {};
    for (let field in this._schema) {
      model[field] = this._schema[field];
    }
    return model;
  }

  getList(filters) {
    if (!this.ref) {
      return null;
    }
    let query;
    if (filters) {
      query = this.ref.where(filters[0], filters[1], filters[2]).get();
    } else {
      query = this.ref.get();
    }
    return query.then((snapshot) => {
      let items = [];
      snapshot.forEach((doc) => {
        let item = this.tidy(doc);
        item = this.sanitizeOut(item);
        items.push(item);
      });
      return items;
    });
  }

  add(values) {
    if (!this.ref) {
      return null;
    }
    values = this.sanitizeIn(values);
    return this.ref.add(values).then(doc => {
      return doc.id;
    });
  }

  save(id, values) {
    if (!this.ref) {
      return null;
    }
    values = this.sanitizeIn(values);
    return this.ref.doc(id).update(values);
  }

  sanitizeIn(data) {
    return data;
  }

  sanitizeOut(data) {
    return data;
  }

  tidy(doc) {
    let data = this.idify(doc.id, doc.data());
    return this.validate(data);
  }

  validate(data) {
    let validated = {};
    // Transfer default values as a baseline
    for (let prop in this._schema) {
      validated[prop] = this._schema[prop];
    }
    // Transfoer or override incoming data
    for (let prop in data) {
      validated[prop] = data[prop];
    }
    return validated;
  }

  idify(id, data) {
    data.id = id;
    return data;
  }
}
