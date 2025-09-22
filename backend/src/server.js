const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build (frontend)
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Routes
app.use('/api/places', require('./views/places'));
app.use('/api/alerts', require('./views/alerts'));
app.use('/api/profile', require('./views/profile'));
app.use('/api/hotels', require('./views/hotels'));
app.use('/api/food', require('./views/food'));
app.use('/api/transport', require('./views/transport'));
app.use('/api/emergency', require('./views/emergency'));
app.use('/api/weather', require('./views/weather'));
app.use('/api/chat', require('./views/chat'));

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'AI Travel Mate API is running!' });
});

// Catch-all handler: serve React app for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB Atlas...');
  
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Increased timeout for Atlas
    socketTimeoutMS: 45000,
    connectTimeoutMS: 15000, // Increased timeout for initial connection
  };
  
  // Log masked connection string (hides password)
  const maskedUri = process.env.MONGO_URI.replace(/:([^:]*?)@/, ':***@');
  console.log('Connecting to:', maskedUri);
  
  mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

// Start the connection process
connectWithRetry();

module.exports = app;