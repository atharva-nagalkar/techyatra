const express = require('express');
const Alert = require('../models/Alert');
const router = express.Router();

// GET /api/alerts - Get all alerts with filtering
router.get('/', async (req, res) => {
  try {
    const {
      type,
      severity,
      state,
      city,
      limit = 20,
      page = 1
    } = req.query;

    // Build filter object
    const filter = { 
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    };

    if (type) {
      filter.type = type;
    }

    if (severity) {
      filter.severity = severity;
    }

    if (state) {
      filter.state = new RegExp(state, 'i');
    }

    if (city) {
      filter.city = new RegExp(city, 'i');
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const alerts = await Alert.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ severity: -1, createdAt: -1 });

    const total = await Alert.countDocuments(filter);

    res.json({
      success: true,
      data: alerts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch alerts' });
  }
});

// GET /api/alerts/types - Get all alert types
router.get('/types', async (req, res) => {
  try {
    const types = await Alert.distinct('type', { isActive: true });
    res.json({ success: true, data: types });
  } catch (error) {
    console.error('Error fetching alert types:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch alert types' });
  }
});

// GET /api/alerts/severities - Get all severity levels
router.get('/severities', async (req, res) => {
  try {
    const severities = await Alert.distinct('severity', { isActive: true });
    res.json({ success: true, data: severities });
  } catch (error) {
    console.error('Error fetching severities:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch severities' });
  }
});

module.exports = router;