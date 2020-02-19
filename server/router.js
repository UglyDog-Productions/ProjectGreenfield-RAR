const express = require('express');

const router = express.Router();

const db = require('./db/controllers.js');

router.put('/reviews/helpful/:review_id', db.updateHelp);
router.put('/reviews/report/:review_id', db.updateReport);

module.exports = router;
