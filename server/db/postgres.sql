CREATE TABLE reviewList(
  product_id serial PRIMARY KEY ,
  page int,
  count int,
  results [] references result NOT NULL,
)

CREATE TABLE meta (
  ratings int
  recommend int
  characteristics int
)

CREATE TABLE result (
  id references review(id) UNIQUE NOT NULL
  rating
  summary
  recommend
  date date
  name
  helpfulness
  photos
)

CREATE TABLE review (
  id serial PRIMARY KEY,
  rating int NOT NULL,
  summary VARCHAR[(60)],
  body VARCHAR[(1000)] NOT NULL,
  recommend boolean NOT NULL,
  name VARCHAR[(60)] NOT NULL,
  email VARCHAR[(60)] NOT NULL,
  photos TEXT [],
  characteristics references characteristics NOT NULL
)

CREATE TABLE report(
  id int
  report int
)

CREATE TABLE helpful(
  id  int
  help int
)

CREATE TABLE characteristics (
id int
)

