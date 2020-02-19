/* eslint-disable camelcase */
// const Pool = require('pg').Pool;
// const pool = new Pool({
//   user: 'Savi',
//   host: 'localhost',
//   database: 'SDC',
//   password: 'password',
//   port: 5432,
// });

const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = 'postgres://postgres:root@localhost:5432/SDC';
const db = pgp(connectionString);

// const getReviews = (req, res) => {
//   const product_id = req.params;
//   const {
//     review_id,
//     rating,
//     summary,
//     recommend,
//     response,
//     body,
//     date,
//     name,
//     helpfulness,
//     url,
//   } = req.body;
//   pool.query(
//     'SELECT (review_id, rating, summary, recommend, response, body, date, name, helpfulness, url) FROM reviews Inner JOIN images ON reviews.review_id = images.review_id',
//     [
//       product_id,
//       review_id,
//       rating,
//       summary,
//       recommend,
//       response,
//       body,
//       date,
//       name,
//       helpfulness,
//       url,
//     ],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.send(200);
//     },
//   );
// };

// // const postReview = (req, res) => {
// //   const product_id = parseInt(request.params.product_id);
// //   const {
// //     rating,
// //     summary,
// //     body,
// //     recommend,
// //     name,
// //     email,
// //     photos,
// //     characteristics,
// //   } = request.body;
// //   pool.query('INSERT INTO reviews(rating, summary, body, recommend, name, email) VALUES (rating, summary, body, recommend, name, email)
// //   INSERT INTO images
// //   INSERT INTO characteristics'  )
// //   res.send(201);
// // };

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

// const updateHelp = (review_id) => {
//   console.log(review_id);
//   pool.query(
//     'UPDATE review SET helpfulness = helpfulness + 1 WHERE review_id = review_id',
//     [review_id],
//   );
//   console.log('returned');
// };

// const updateReport = (req, res) => {
//   const { report } = req.body;
//   const review_id = req.param;
//   pool.query(
//     'UPDATE review SET report = true',
//     [report, review_id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.send(204);
//     },
//   );
// };

function updateReport(req, res, next) {
  const review_id = parseInt(req.params.review_id);
  db.none('UPDATE review SET report = report', [review_id])
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
  // getReviews,
  // // postReview,
  // getMeta,
  // updateHelp,
  updateReport: updateReport,
};
