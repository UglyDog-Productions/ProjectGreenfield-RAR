const mongoose = require('mongoose');
const db = require('../index.js');

const listSchema = new mongoose.Schema({
  page: Number,
  count: Number,
  results: {
    rating: Number,
    summary: String,
    body: String,
    recommend: Boolean,
    name: String,
    email: String,
    photos: [String],
    characteristics: {
      id: Number,
    },
  },
});

const ReviewList = mongoose.model('ReviewList', listSchema);

module.exports = ReviewList;
