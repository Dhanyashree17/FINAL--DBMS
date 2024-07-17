const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(__dirname));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dhanya4cb21is013/*',
    database: 'shops'
});

// Serve your static files (index.html, etc.)
app.use(express.static(__dirname));

// Sign Up functionality
app.post('/register', (req, res) => {
    const { email,password } = req.body;

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
            console.error('Error hashing password:', hashErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Check the length of the email before inserting
        if (email.length > 50) {
            return res.status(400).json({ error: 'Email is too long' });
        }

        console.log('User Type:', userType);
        const tableName = userType === 'users' ? 'users' : 'users';
        console.log('Table Name:', tableName);
        const sqlQuery = `INSERT INTO ${tableName} (email, password) VALUES (?, ?)`;

        connection.query(
            sqlQuery,
            [email, hashedPassword],
            (insertErr, results) => {
                if (insertErr) {
                    console.error('Error inserting user into MySQL:', insertErr);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Inserted into MySQL:', results);
                    res.writeHead(302, {
                        'Location': '/index?message=success'
                    });
                    res.end();
                }
            }
        );
    });
});

// Login functionality

app.post('/index', (req, res) => {
    const { emailid, password } = req.body;

    const query = 'SELECT * FROM serviceseekers WHERE emailid = ? UNION ALL SELECT * FROM serviceprovider WHERE emailid = ?';

    connection.query(query, [emailid, emailid], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        console.log('Received email:', emailid);

        console.log('Query Results:', results);

        if (results.length === 0) {
            // User not found in either table
            console.log('User not found');
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare the provided password with the stored plain text password
        if (password !== user.confirmpassword) {
            // Failed login
            console.log('Failed login');
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        // Successful login
         // Failed login
         console.log('sucessful login');
        return res.json({ success: true, message: 'Login successful' });
    });
}); 
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
