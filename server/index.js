const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/reviews/:product_id', (req, res) => {
  console.log(req.body);
  // INSERT INTO reviews
  res.send(201);
});

app.get('/reviews/:product_id/list/?', (req, res) => {
  console.log(req.body);
  // SELECT * FROM reviewList
  res.send(200);
});

app.get('/reviews/:product_id/meta', (req, res) => {
  console.log(req.body);
  // SELECT * FROM meta
  res.send(200);
});

app.put('/reviews/helpful/:review_id', (req, res) => {
  console.log(req.body);
  // UPDATE helpful
  res.send(204);
});

app.put('/reviews/report/:review_id', (req, res) => {
  console.log(req.body);
  // UPDATE report SET help = help + 1
  res.send(204);
});

app.listen(port, () => console.log('yee yee'));

module.export = app;
