const client = require('./es_client');

(async function () {
    const result = await client.search({
        index: 'serviceproviders',
        type: 'provider',
        body: {
            query: {
                regexp: {"desc": ".*files.*"}
            }
        }
    });
    console.dir(result,{colors:true,depth:10});
})().catch(e => {
    console.log(e);
});
