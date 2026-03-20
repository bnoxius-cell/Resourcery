// 1. Import your dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the passwords from your .env file

// 2. Initialize the Express app
const app = express();

// 3. Set up Middleware (Rules for how data comes in)
app.use(cors()); 
app.use(express.json()); 

// 4. Connect to MongoDB Atlas
const uri = process.env.MONGO_URI; 

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// 5. Create a basic test route
app.get('/', (req, res) => {
  res.send('The Resourcery API is running!');
});

// 6. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});