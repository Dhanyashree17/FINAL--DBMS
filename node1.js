const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dhanya4CB21IS013/-*',
    database: 'shops',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Endpoint to insert data into the 'shops' table
app.post('/insertShop', (req, res) => {
  const { name, location, category } = req.body;

  const insertQuery = 'INSERT INTO shops (name, location, category) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, location, category], (err, results) => {
    if (err) {
      console.error('Error inserting data into the shops table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Shop data inserted successfully');
      res.status(200).json({ message: 'Shop data inserted successfully' });
    }
  });
});

// Endpoint to insert data into the 'products' table
app.post('/insertProduct', (req, res) => {
  const { name, price, shop_id } = req.body;

  const insertQuery = 'INSERT INTO products (name, price, shop_id) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, price, shop_id], (err, results) => {
    if (err) {
      console.error('Error inserting data into the products table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Product data inserted successfully');
      res.status(200).json({ message: 'Product data inserted successfully' });
    }
  });
});

// Endpoint to insert data into the 'users' table
app.post('/insertUser', (req, res) => {
  const { username, password } = req.body;

  const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(insertQuery, [username, password], (err, results) => {
    if (err) {
      console.error('Error inserting data into the users table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User data inserted successfully');
      res.status(200).json({ message: 'User data inserted successfully' });
    }
  });
});

// Endpoint to insert data into the 'orders' table
app.post('/insertOrder', (req, res) => {
  const { user_id } = req.body;

  const insertQuery = 'INSERT INTO orders (user_id) VALUES (?)';
  db.query(insertQuery, [user_id], (err, results) => {
    if (err) {
      console.error('Error inserting data into the orders table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Order data inserted successfully');
      res.status(200).json({ message: 'Order data inserted successfully' });
    }
  });
});

// Endpoint to insert data into the 'ordered_products' table
app.post('/insertOrderedProduct', (req, res) => {
  const { order_id, product_id, quantity } = req.body;

  const insertQuery = 'INSERT INTO ordered_products (order_id, product_id, quantity) VALUES (?, ?, ?)';
  db.query(insertQuery, [order_id, product_id, quantity], (err, results) => {
    if (err) {
      console.error('Error inserting data into the ordered_products table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Ordered Product data inserted successfully');
      res.status(200).json({ message: 'Ordered Product data inserted successfully' });
    }
  });
});

// Endpoint to insert data into the 'payments' table
app.post('/insertPayment', (req, res) => {
  const { order_id, amount, payment_method, transaction_id } = req.body;

  const insertQuery = 'INSERT INTO payments (order_id, amount, payment_method, transaction_id) VALUES (?, ?, ?, ?)';
  db.query(insertQuery, [order_id, amount, payment_method, transaction_id], (err, results) => {
    if (err) {
      console.error('Error inserting data into the payments table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Payment data inserted successfully');
      res.status(200).json({ message: 'Payment data inserted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
