/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

const writeImage = fs.createWriteStream('images.csv');
writeImage.write('id,review_id,url\n', 'utf8');

function writeEightMillionImages(writer, encoding, callback) {
  let i = 8000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const review_id = faker.random.number();
      const url = faker.image.imageUrl();
      const data = `${id},${review_id},${url}\n`;
      if (i === 0) {
        writer.write(data, encoding);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i < 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeEightMillionImages(writeImage, 'utf-8', () => {
  writeImage.end();
});
// INSERT INTO images (
//   review_id, url
// )

// SELECT
//   (9 * random())::int + 1 r_num,
//   md5(random():: text),

//   FROM generate_series(1, 100) s(i);
