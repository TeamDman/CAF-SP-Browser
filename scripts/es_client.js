const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'error'
});

module.exports = esClient;
