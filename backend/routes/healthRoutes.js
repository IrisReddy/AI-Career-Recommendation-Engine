const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint verifying Express API and MongoDB connection state
 * @access  Public
 */
router.get('/health', (req, res) => {
  const dbStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbStateCode = mongoose.connection.readyState;
  const dbState = dbStateMap[dbStateCode] || 'unknown';

  res.status(200).json({
    status: 'OK',
    message: 'Backend server is running smoothly',
    timestamp: new Date().toISOString(),
    service: 'AI Career Recommendation Backend',
    database: {
      status: dbState,
      readyState: dbStateCode,
    },
  });
});

module.exports = router;
