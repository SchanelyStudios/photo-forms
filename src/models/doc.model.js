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
              return this.tidy(doc);
          }
      })
      .catch(err => {
          console.error('Error getting document', err);
      });
  }

  getList(filters, sorts) {
    if (!this.ref) {
      return null;
    }
    return this.ref.get().then((snapshot) => {
      let items = [];
      snapshot.forEach((doc) => {
        let item = this.tidy(doc);
        items.push(item);
      });
      return items;
    });
  }

  tidy(doc) {
    let data = this.idify(doc.id, doc.data());
    console.log(data);
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
