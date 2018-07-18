const client = require('./es_client');
const express = require('express');
const path = require('path');
const PORT = 5000;


express()
    .use(express.static(path.join(__dirname, '../public')))
    .set('views', path.join(__dirname, '../views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index', {query: ""}))
    .get('/search', async (req, res) => {
        console.log(`Searching for '${req.query.query}'`);
        let search = await client.search({
            index: 'serviceproviders',
            type: 'provider',
            body: {
                query: {
                    regexp: {"desc": req.query.query || ""}
                }
            }
        });
        res.render('pages/search', {search: search, query: req.query.query});
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
