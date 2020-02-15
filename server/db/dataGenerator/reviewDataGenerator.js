/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

const writeReview = fs.createWriteStream('reviews.csv');
writeReview.write(
  'review_id,product_id,rating,date,summary,body,recommend,report,name,email,response,helpfulness\n',
  'utf8',
);

function writeFiveMillionReviews(writer, encoding, callback) {
  let i = 1000000;
  let review_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      review_id += 1;
      const product_id = faker.random.number();
      const rating = faker.random.number({
        min: 1,
        max: 5,
      });
      const date = faker.date.recent();
      const summary = faker.lorem.sentence();
      const body = faker.lorem.paragraph();
      const recommend = faker.random.boolean();
      const report = faker.random.boolean();
      const name = faker.internet.userName();
      const email = faker.internet.email();
      const response = faker.lorem.sentence();
      const helpfulness = faker.random.number();
      const data = `${review_id},${product_id},${rating},${date},${summary},${body},${recommend},${report},${name},${email},${response},${helpfulness}\n`;
      if (i === 0) {
        writer.write(data, encoding);
      } else {
        ok = writer.write(data, encoding);
      }
      console.log(ok);
    } while (i > 0 && ok);
    if (i < 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeFiveMillionReviews(writeReview, 'utf-8', () => {
  writeReview.end();
});

// this is for inserting directly into postico
// INSERT INTO review (
//   review_id, product_id, rating, date, summary, body, recommend, report, name, email, reponse, helpfulness
// )

// SELECT
//   (round(random()):: int),
//   (round(random()):: int),
//   (NOW() + (random() * (NOW()+'90 days' - NOW())) + '30 days'),
//   md5(random():: text),
//   md5(random():: text),
//   (round(random()):: int):: boolean,
//   (round(random()):: int):: boolean,
//   md5(random():: text),
//   md5(random():: text),
//   md5(random():: text),
//   (round(random()):: int)

//   FROM generate_series(1, 900000000) s(i)
