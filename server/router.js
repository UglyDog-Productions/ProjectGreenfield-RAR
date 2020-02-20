/* eslint-disable camelcase */
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const db = require('./db/controllers.js');

router.use(bodyParser.json());

router.get('/reviews/:product_id/list', db.getReviews);
router.post('/reviews/:product_id', function(req, res, next) {
  const product_id = parseInt(req.params.product_id);
  const { rating, summary, body, recommend, name, email } = req.body;
  console.log(req.body);
  db.postReview(product_id, rating, summary, body, recommend, name, email)
    .then(function() {
      console.log('clicked');
      res.status(201).json({
        status: 'success',
        message: 'Inserted Review',
      });
    })
    .catch(function(err) {
      return next(err);
    });
});
router.put('/reviews/helpful/:review_id', db.updateHelp);
router.put('/reviews/report/:review_id', db.updateReport);

module.exports = router;
