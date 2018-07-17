var client = require('./es_client');

client.indices.delete({index: 'library'},function(err,resp,status) {
    console.log("delete",resp);
});