const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('entities.db');

fs.readFile('caf_interfed_signed.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
        result = result['md:EntitiesDescriptor']['md:EntityDescriptor'];
        db.serialize(function () {
            let statement = db.prepare('INSERT INTO entity VALUES (?, ?, ?, ?, ?)');
            let count = 0;
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
                    statement.run(count, id, name, url, desc);
                    count++;
                }
                // break;
            }
            statement.finalize();
        });
    });
});
