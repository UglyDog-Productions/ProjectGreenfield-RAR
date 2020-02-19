const express = require('express');
const bodyParser = require('body-parser');
// const db = require('./db/controllers.js');
const index = require('./router.js');

const app = express();
const port = 3000;

app.use(index);
app.use(bodyParser.json());

// app.get('/reviews/:product_id/meta', db.getMeta);

app.listen(port, () => console.log('server is up and running'));

module.export = app;
