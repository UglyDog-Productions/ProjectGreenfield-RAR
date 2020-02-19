const express = require('express');

const router = express.Router();

const db = require('./db/controllers.js');

router.get('/reviews/:product_id/list', db.getReviews);
router.post('/reviews/:product_id', db.postReview);
router.put('/reviews/helpful/:review_id', db.updateHelp);
router.put('/reviews/report/:review_id', db.updateReport);

module.exports = router;
