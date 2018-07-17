const client = require('./es_client');

client.search({
    index: 'serviceproviders',
    type: 'provider',
    body: {
        query: {
            regexp: {"desc": ".*files.*"}
        },
    }
}, function (error, response, status) {
    if (error) {
        console.log("search error: " + error)
    }
    else {
        console.log("--- Response ---");
        console.log(response);
        console.log("--- Hits ---");
        response.hits.hits.forEach(function (hit) {
            console.log(hit);
        })
    }
});