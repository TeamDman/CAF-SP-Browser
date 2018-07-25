const fs = require('fs');
const esClient = require('./es_client');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('resources/entities.db');

const populate = function bulkIndex () {
  db.serialize(async function () {
    let bulkBody = [];
    let count = 0;
    db.each('SELECT * FROM entity', function (err, row) {
      // console.log(`Appending [${row.id}] ${row.name}`);
      count++;
      bulkBody.push({
        index: {
          _index: 'serviceproviders',
          _type: 'provider',
          _id: row.id
        }
      });
      bulkBody.push(row);
    }, async function () {
      console.log(`Processing bulk size ${bulkBody.length}`);

      let response = await esClient.bulk({body: bulkBody});
      let errorCount = 0;

      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });

      console.log(`Successfully indexed ${count - errorCount} out of ${count} items (${errorCount} errors)`);
    });
  });
};

console.log('Populating elasticsearch');
populate();
