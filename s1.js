const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'priyanka@123',
  database: 'trip',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/api/register', (req, res) => {
  console.log('Received registration request:', req.body);
  
  const { username, password, mobileNumber, adharCard, licenseNumber } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    connection.query(
      'INSERT INTO user (username, password, mobileNumber, adharCard, licenseNumber) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, mobileNumber, adharCard, licenseNumber],
      (err, results) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        const userId = results.insertId;
        console.log('User registered successfully. UserID:', userId);

        res.status(200).json({ userId, username });
      }
    );
  });
});

app.get('/api/trip', (req, res) => {
  connection.query('SELECT * FROM trip', (error, results) => {
    if (error) {
      console.error('Error fetching trips:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/trip', (req, res) => {
  const { destination, travelerId, startDate, endDate, duration } = req.body;

  connection.query(
    'INSERT INTO trip (DESTINATION, TRAVELLERID, STARTDATE, ENDDATE, DURATION) VALUES (?, ?, ?, ?, ?)',
    [destination, travelerId, startDate, endDate, duration],
    (err, result) => {
      if (err) {
        console.error('Error creating trip:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      const tripId = result.insertId;
      console.log('Trip created successfully. TripID:', tripId);
      res.status(201).json({ tripId });
    }
  );
});

app.get('/api/trip/:id', (req, res) => {
  // Your existing logic to fetch a specific trip details and posts
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(Server is running on port ${port});
});