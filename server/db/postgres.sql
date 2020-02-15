
CREATE TABLE review (
  review_id serial PRIMARY KEY UNIQUE NOT NULL,
  product_id int NOT NULL,
  rating int NOT NULL,
  date date NOT NULL,
  summary VARCHAR,
  body VARCHAR NOT NULL,
  recommend boolean NOT NULL,
  report boolean NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  response text,
  helpfulness int not null
);

CREATE TABLE images(
id serial PRIMARY KEY UNIQUE NOT NULL,
review_id int references review(review_id),
url text
);

CREATE TABLE characteristics(
char_id serial PRIMARY KEY UNIQUE NOT NULL,
product_id int NOT NULL,
name text,
);

CREATE TABLE reviewChar (
id serial PRIMARY KEY UNIQUE NOT NULL,
review_id int references review(review_id),
char_id int references characteristics(char_id),
value int NOT NULL
);

COPY review
FROM '/Users/Savi/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;

COPY images
FROM '/Users/Savi/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY characteristics
FROM '/Users/Savi/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;

COPY reviewChar
FROM '/Users/Savi/Downloads/characteristic_review.csv' DELIMITER ',' CSV HEADER;