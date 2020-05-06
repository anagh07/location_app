const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/connectDB');

const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

// Use express body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Connect DB
db();

// Set public folder for static uis
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes folder
app.use('/api/stores', require('./routes/api/stores'));

// Set port number
const PORT = process.env.PORT || 5000;

// Initialize server
app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
