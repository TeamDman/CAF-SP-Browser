var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('entities.db');
db.serialize(function () {
  db.each('SELECT name FROM entity', function (err, row) {
    console.log(row.name);
  });
});
