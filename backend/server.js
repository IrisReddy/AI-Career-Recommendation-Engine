const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const healthRoutes = require('./routes/healthRoutes');
const testUserRoutes = require('./routes/testUserRoutes');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

// Load environment configuration
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middleware Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route Mounting
app.use('/api', healthRoutes);
app.use('/api/test', testUserRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Root Fallback Route
app.get('/', (req, res) => {
  res.json({
    message: 'AI-Driven Career Resource & Employment Recommendation Engine API',
    healthCheck: '/api/health',
  });
});

// Start HTTP Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[Server] Express server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle uncaught errors
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] ${err.message}`);
});
