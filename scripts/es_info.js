const esClient = require('./es_client');

const indices = function indices() {
    return esClient.cat.indices({v: true})
        .then(console.log)
        .catch(err => console.error(`Error connecting to the es client: ${err}`));
};
const health = function health() {
    esClient.cluster.health({},function(err,resp,status) {
        console.log("-- Client Health --",resp);
    });
};
indices();
health();