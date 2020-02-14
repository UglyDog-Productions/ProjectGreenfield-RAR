
CREATE TABLE review (
  product_id int NOT NULL,
  review_id int PRIMARY KEY,
  rating int NOT NULL,
  summary VARCHAR(60),
  body VARCHAR(1000) NOT NULL,
  recommend boolean NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  helpfulness int not null,
  report boolean,
)

CREATE TABLE images(
review_id int references review(review_id),
image_id int PRIMARY KEY UNIQUE NOT NULL,
url text,
)

CREATE TABLE characteristics(
product_id int NOT NULL,
char_id int PRIMARY KEY UNIQUE NOT NULL,
name text,
value int NOT NULL,
)

CREATE TABLE reviewChar (
id int PRIMARY KEY UNIQUE NOT NULL
review_id int references review(review_id),
char_id int references characteristics(char_id),
)

INSERT INTO review (product_id, review_id, rating, summary, body, recommend, name, email, helpfulness, report) VALUES (4,1,4,'snacks are good', 'Listen I like snacks and they are good and today I had seaweed and it was good', true, 'sadboi', 'sad@sad.com', 6, false);
INSERT INTO images (review_id, image_id, url) VALUES (1,1,'snacksaregood.com');
INSERT INTO images (review_id, image_id, url) VALUES (1,2,'nacknack.com');
INSERT INTO characteristics (char_id, name, value) VALUES (14, 'size', 5);
INSERT INTO characteristics (char_id, name, value) VALUES (12, 'fit', 4);
INSERT INTO reviewChar (id, review_id, char_id) VALUES (1,1,12);
INSERT INTO reviewChar (id, review_id, char_id) VALUES (1,1,14);