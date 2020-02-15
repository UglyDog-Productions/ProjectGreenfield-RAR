/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

const writeChar = fs.createWriteStream('char.csv');
writeChar.write('char_id,product_id,name\n', 'utf8');

function writeSevenMillionReviews(writer, encoding, callback) {
  let i = 7000000;
  let char_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      char_id += 1;
      const product_id = faker.random.number();
      const name = faker.random.word();
      const data = `${char_id},${product_id},${name}\n`;
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

writeSevenMillionReviews(writeChar, 'utf-8', () => {
  writeChar.end();
});

// INSERT INTO characteristics (
//   product_id, name
// )

// SELECT
// (round(random()):: int),
//   md5(random():: text),

//   FROM generate_series(1, 100) s(i);
