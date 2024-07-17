const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS, JS, images)
app.use(express.static('public'));

// Route to handle form submission
app.post('/action_page', (req, res) => {
  const { email, psw, 'psw-repeat': pswRepeat } = req.body;

  // Validate form data here if needed
  // For demonstration, we'll just log the received data
  console.log('Received form data:');
  console.log('Email:', email);
  console.log('Password:', psw);
  console.log('Repeat Password:', pswRepeat);

  // Send a response
  res.send('Form data received successfully!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});