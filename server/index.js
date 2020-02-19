const express = require('express');
const bodyParser = require('body-parser');
// const db = require('./db/controllers.js');
const index = require('./router.js');

const app = express();
const port = 3000;

app.use(index);
app.use(bodyParser.json());

// app.post('/reviews/:product_id', db.postReview);

// app.get('/reviews/:product_id/list/?', db.getReviews);

// app.get('/reviews/:product_id/meta', db.getMeta);

// app.put('/reviews/report/:review_id', db.updateReport);

app.listen(port, () => console.log('yee yee'));

module.export = app;
