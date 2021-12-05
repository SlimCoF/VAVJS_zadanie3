CREATE TABLE produkty (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nazov varchar(300) NOT NULL,
  cena float NOT NULL,
  img varchar(300) NOT NULL
);
INSERT INTO produkty(id, nazov, cena, img) VALUES
(1,'Lopata', '24.99', 'https://cdn-icons-png.flaticon.com/512/4478/4478159.png'),
(2,'Krompac', '34.99', 'https://cdn-icons-png.flaticon.com/512/409/409742.png'),
(3,'Hrable', '15.99', 'https://cdn-icons-png.flaticon.com/512/4328/4328650.png');

CREATE TABLE zakaznici (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email varchar(300) NOT NULL,
  meno varchar(300) NOT NULL,
  ulica varchar(300) NOT NULL,
  cislo int NOT NULL,
  mesto varchar(300) NOT NULL,
  psc int(5) NOT NULL
);

CREATE TABLE objednavky (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  produkt_id int NOT NULL,
  zakaznik_id int NOT NULL,
  stav tinyint NOT NULL
);

CREATE TABLE reklama (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pageUrl varchar(300) NOT NULL,
  imgUrl varchar(300) NOT NULL,
  counter int NOT NULL
);
INSERT INTO reklama(id, pageUrl, imgUrl, counter) VALUES
(1, 'https://www.google.com/', 'https://cdn-icons-png.flaticon.com/512/6184/6184625.png', 0);