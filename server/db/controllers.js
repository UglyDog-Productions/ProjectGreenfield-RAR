/* eslint-disable camelcase */
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'SRC',
  password: 'password',
  port: 5432,
});

const getReviews = (req, res) => {
  const product_id = parseInt(request.params.product_id);
  res.send(200);
};

const postReview = (req, res) => {
  const product_id = parseInt(request.params.product_id);
  const {
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics,
  } = request.body;
  res.send(201);
};

const getMeta = (req, res) => {
  const product_id = parseInt(request.params.product_id);
  res.send(200);
};

const updateHelp = (req, res) => {
  const { helpfulness } = req.body;
  const review_id = parseInt(request.params.review_id);
  pool.query(
    'UPDATE review SET helpfulness = helpfulness + 1',
    [helpfulness, review_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(204);
    },
  );
};

const updateReport = (req, res) => {
  const { report } = req.body;
  const review_id = parseInt(request.params.review_id);
  pool.query(
    'UPDATE review SET report = true',
    [report, review_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(204);
    },
  );
  res.send(204);
};

module.exports = {
  getReviews,
  postReview,
  getMeta,
  updateHelp,
  updateReport,
};
