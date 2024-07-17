const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dhanya4CB21IS013/-*',
  database: 'shops',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

// Endpoint for user signup
app.post('/api/signup', (req, res) => {
  console.log('Received registration request:', req.body);
  const { email, psw } = req.body; // Adjusted to match input field names

  bcrypt.hash(psw, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      return res.status(500).json({ error: 'Internal server error - hashing password' });
    }

    connection.query(
      'INSERT INTO users(email, password) VALUES(?, ?)',
      [email, hashedPassword],
      (queryErr, results) => {
        if (queryErr) {
          console.error('Error registering user:', queryErr);
          return res.status(500).json({ error: 'Internal server error - inserting into database' });
        }

        const id = results.insertId;
        console.log('User registered successfully. id:', id);

        res.status(200).json({ id, email });
      }
    );
  });
});

app.post('/api/login', (req, res) => {
  const { email, psw } = req.body;

  connection.query(
    'SELECT * FROM users WHERE email=?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Internal server error - querying database' });
      }

      if (results.length === 0) {
        // Email not found
        console.log('Email not found');
        return res.status(400).json({ error: 'Email or password is incorrect' });
      }

      const users = results[0];

      bcrypt.compare(psw, users.password, (bcryptErr, bcryptResult) => {
        console.log('Bcrypt comparison result:', bcryptResult);
      
        if (bcryptErr) {
          console.error('Error comparing passwords:', bcryptErr);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (bcryptResult) {
          // Password match, login successful
          console.log('Login successful');
          const responseData = { id: user.id, email: user.email, message: 'Login successful' };

          // Include the redirect URL in the response
          responseData.redirectUrl = '/'; // Replace with your desired redirect URL

          res.status(200).json(responseData);
        } else {
          // Password doesn't match
          console.log('Incorrect password');
          res.status(400).json({ error: 'Email or password is incorrect' });
        }
      });
    }
  );
});


// Endpoint to get products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Internal Server Error');
      } else {
          res.json(results);
      }
  });
});

app.put('/updateProductKg/:product_id', (req, res) => {
  const product_id = req.params.product_id; // Correct parameter name
  const quantity = req.body.quantity;

  const updateQuery = 'CALL updateProductKg(?, ?)';
  connection.query(updateQuery, [product_id, quantity], (err, results) => {
      if (err) {
          console.error('Error updating product kg:', err);
          res.status(500).send('Internal Server Error- querying database');
      } else {
          res.json({ message: 'Product kg updated successfully' });
      }
  });
});



app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/products', (req, res) => {
  res.sendFile(__dirname + '/product.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
