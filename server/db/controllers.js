/* eslint-disable prettier/prettier */
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
        product_id: parseInt(req.params.product_id),
        results: data,
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
  characteristics,
) {
  const date = moment().format('MMM DD YYYY');
  return db
    .many(
      `INSERT INTO review(product_id, date, rating, summary, body, recommend, name, email, report, helpfulness) VALUES (${product_id},'${date}',${rating}, '${summary}', '${body}', ${recommend}, '${name}', '${email}', false, 0) returning review_id`,
    )
    .then((data) => {
      const reviewId = data[0].review_id;
      url.map((p) => {
        return db.none(
          `INSERT INTO images (review_id, url) VALUES(${reviewId}, '${p}')`,
        );
      });
      return reviewId;
    })
    .then((reviewId) => {
      characteristics.map((charObj) => {
        const charName = charObj.name;
        const charValue = charObj.value;
        return db.none(
          `WITH new_char as (INSERT INTO characteristics(product_id, name) VALUES (${product_id}, '${charName}') returning char_id) INSERT INTO reviewchar (review_id, char_id, value) VALUES (${reviewId}, (select char_id from new_char), ${charValue})`,
        );
      });
      return reviewId;
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      throw err;
    });
}

function getMeta(req, res, next) {
  const product_id = parseInt(req.params.product_id);
  const ratingsObj = {};
  const recObj = {};
  const charObj = {};
  db.any(`SELECT (rating) FROM review where product_id = ${product_id}`)
    .then((data) => {
      data.map((line) => {
        const row = line.rating;
        if (ratingsObj[row] === undefined) {
          ratingsObj[row] = 1;
        } else {
          ratingsObj[row] += 1;
        }
      });
      return ratingsObj;
    })
    .then((data) => {
      return db.any(
        `Select (recommend) FROM review where product_id = ${product_id}`,
      );
    })
    .then((data) => {
      data.map((line) => {
        const row = line.recommend;
        if (recObj[row] === undefined) {
          recObj[row] = 1;
        } else {
          recObj[row] += 1;
        }
      });
      return recObj;
    })
    .then(() => {
      return db.any(
        `SELECT characteristics.char_id, characteristics.name, reviewchar.value FROM characteristics LEFT OUTER JOIN reviewchar ON reviewchar.char_id = characteristics.char_id WHERE product_id = ${product_id}`,
      );
    })
    .then((data) => {
      data.map((line) => {
        const type = line.name;
        const typeid = line.char_id;
        const typevalue = line.value;
        if (charObj[type] === undefined) {
          charObj[type] = {
            id: typeid,
            value: typevalue,
          };
        } else {
          charObj[type].value += typevalue;
        }
      });
      return charObj;
    })
    .then(function(data) {
      res.status(200).json({
        product_id: parseInt(req.params.product_id),
        ratings: ratingsObj,
        recommend: recObj,
        characteristics: charObj,
        message: 'Meta Data Retrieved',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

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
  getMeta: getMeta,
  updateHelp: updateHelp,
  updateReport: updateReport,
};
