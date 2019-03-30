const Datastore = require('nedb');
let data_db = new Datastore({
  filename: 'data.db',
  autoload: true
});

module.exports = data_db;
