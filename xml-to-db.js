var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('entities.db');

fs.readFile('caf_interfed_signed.xml', function (err, data) {
  parser.parseString(data, function (err, result) {
    result = result['md:EntitiesDescriptor']['md:EntityDescriptor'];
    db.serialize(function () {
      var statement = db.prepare('INSERT INTO entity VALUES (?, ?, ?, ?)');
      for (let entity in result) {
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
          statement.run(id, name, url, desc);
        }
      // break;
      }
      statement.finalize();
    });
  });
});
