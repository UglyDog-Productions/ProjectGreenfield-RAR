const express = require('express');

const router = express.Router();

const db = require('./db/controllers.js');
// router.get('/api/players', db.getAllPlayers);
// router.get('/api/players/:id', db.getSinglePlayer);
// router.post('/api/players', db.createPlayer);
router.put('/reviews/report/:review_id', db.updateReport);

module.exports = router;
