/* eslint-disable camelcase */
const promise = require('bluebird');
const moment = require('moment');

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = 'postgres://postgres:root@localhost:5432/SDC';
const db = pgp(connectionString);

function getReviews(req, res, next) {
  const product_id = parseInt(req.params.product_id);
  console.log(product_id);
  db.any(
    `SELECT review.review_id, review.rating, review.summary, review.recommend, review.response, review.body, review.date, review.name, review.helpfulness, images.url FROM review INNER JOIN images ON images.review_id = review.review_id WHERE product_id = ${product_id}`,
    [product_id],
  )
    .then(function(data) {
      console.log('clicked');
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Got all reviews for product',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function postReview(
  product_id,
  rating,
  summary,
  body,
  recommend,
  name,
  email,
  url,
) {
  console.log(url);
  const date = moment().format('MMM DD YYYY');
  console.log(date);
  return db.none(
    `WITH new_review as (INSERT INTO review(product_id, date, rating, summary, body, recommend, name, email, report, helpfulness) VALUES (${product_id},'${date}',${rating}, '${summary}', '${body}', ${recommend}, '${name}', '${email}', false, 0) returning review_id) INSERT INTO images (review_id, url) VALUES((SELECT (SELECT review_id from new_review), unnest(${url})) )`,
  );
}

// const getMeta = (req, res) => {
//   const product_id = req.params;
//   const { review_id, rating, recommend } = req.body;
//   pool.query(
//     'SELECT (product_id, review_id, rating, recommend) FROM reviews Inner JOIN characteristics ON reviews.product_id = characteristics.product_id',
//     [product_id, review_id, rating, recommend],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.send(200);
//     },
//   );
// };

function updateHelp(req, res, next) {
  const review_id = parseInt(req.params.review_id);
  console.log(review_id);
  db.none(
    `UPDATE review SET helpfulness = helpfulness + 1 WHERE review_id = ${review_id}`,
    [review_id],
  )
    .then(function() {
      res.status(204).json({
        status: 'success',
        message: 'Help increased',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateReport(req, res, next) {
  const review_id = parseInt(req.params.review_id);
  db.none(`UPDATE review SET report = report WHERE review_id = ${review_id}`, [
    review_id,
  ])
    .then(function() {
      res.status(204).json({
        status: 'success',
        message: 'reported',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getReviews: getReviews,
  postReview: postReview,
  // getMeta,
  updateHelp: updateHelp,
  updateReport: updateReport,
};
