const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('resources/entities.db');

console.log('Populating entities database');

fs.readFile('./resources/caf_interfed_signed.xml', function (err, data) {
  parser.parseString(data, function (err, result) {
    result = result['md:EntitiesDescriptor']['md:EntityDescriptor'];
    db.serialize(function () {
      db.run('begin transaction'); // https://nelsonslog.wordpress.com/2014/11/16/node-js-sqlite3-very-slow-bulk-inserts/
      db.run('DROP TABLE IF EXISTS entity');
      db.run('CREATE TABLE entity (id int, entityID String, name String, url String, desc String)');
      let statement = db.prepare('INSERT INTO entity VALUES (?, ?, ?, ?, ?)');
      for (let entity in result) {
        console.log(`Preparing entity ${entity} of ${result.length}`);
        if (result[entity]['md:Organization'] !== undefined) {
          let id = result[entity]['$']['entityID'];

          let getEng = obj => {
            for (let locale in obj) {
              if (obj[locale]['$']['xml:lang'] === 'en') {
                return obj[locale]['_'];
              }
            }
          };

          let org = result[entity]['md:Organization'][0];
          let name = getEng(org['md:OrganizationName']);
          let url = getEng(org['md:OrganizationURL']);
          let info;
          let desc;
          if (
            (info = result[entity]['md:SPSSODescriptor']) &&
                        (info = info[0]['md:Extensions']) &&
                        (info = info[0]['mdui:UIInfo'])) {
            desc = getEng(info[0]['mdui:Description']);
          }
          statement.run(entity, id, name, url, desc);
        }
        // break;
      }
      console.log('Finalizing databse input');
      statement.finalize();
      db.run('commit');
      console.log('Database created and populated');
    });
  });
});
