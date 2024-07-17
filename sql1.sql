CREATE DATABASE shops;
USE shops;
CREATE TABLE shops (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL
);
SELECT *FROM shops;
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    shop_id INT,
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
SELECT *FROM users;
INSERT INTO users values(111,'Riya','riya12#');
INSERT INTO users values(121,'Arun','arun12#');
INSERT INTO users values(131,'John','john12#');
SELECT *FROM users;
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE ordered_products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO shops.products VALUES (1,'CARROT',60,1);
INSERT INTO shops.products VALUES (2,'TOMATO',25,1);
 INSERT INTO shops.products VALUES(3,'CUCUMBER',30,1);
 INSERT INTO shops.products VALUES(4,'PEAS',68,1);
INSERT INTO shops.products VALUES(5,'BROCOLLI',30,1);
 INSERT INTO shops.products VALUES(6,'ONION',50,1);
 INSERT INTO shops.products VALUES(7,'RADISH',40,1);
 INSERT INTO shops.products VALUES(8,'CAULI FLOWER',41,1);
 INSERT INTO shops.products VALUES(9,'GARLIC',200,1);
 INSERT INTO shops.products VALUES(10,'CABBAGE',25,1);
 INSERT INTO shops.products VALUES(11,'BITTER GUARD',55,1);
 INSERT INTO shops.products VALUES(12,'APPLE',120,1);
 INSERT INTO shops.products VALUES(13,'PEARS',246,1);
 INSERT INTO shops.products VALUES(14,'PINEAPPLE',90,1);
 INSERT INTO shops.products VALUES(15,'KIWI',500,1);
 INSERT INTO shops.products VALUES(16,'MANGO',100,1);
 INSERT INTO shops.products VALUES(17,'POMEGRANATE',160,1);
 INSERT INTO shops.products VALUES(18,'BANANA',45,1);
 INSERT INTO shops.products VALUES(19,'ORANGE',70,1);
 INSERT INTO shops.products VALUES(20,'CHERRY',600,1);
 INSERT INTO shops.products VALUES(21,'GRAPES',120,1);
 INSERT INTO shops.products VALUES(22,'RICE',50,1);
 INSERT INTO shops.products VALUES(23,'SUGAR',60,1);
 INSERT INTO shops.products VALUES(24,'SALT',15,1);
 INSERT INTO shops.products VALUES(25,'PICKLE',150,1);
 INSERT INTO shops.products VALUES(26,'JEERA',55,1);
 INSERT INTO shops.products VALUES(27,'TURMERIC POWDER',20,1);
 INSERT INTO shops.products VALUES(28,'TEA POWDER',55,1);
 INSERT INTO shops.products VALUES(29,'COFFEE POWDER',200,1);
 INSERT INTO shops.products VALUES(30,'SUNFLOWER OIL',235,1);
 INSERT INTO shops.products VALUES(31,'CHILLI POWDER',20,1);
 INSERT INTO shops.products VALUES(32,'ATTA',60,1);








