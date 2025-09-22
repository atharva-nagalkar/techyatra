const express = require('express');
const WeatherRecord = require('../models/WeatherRecord');
const router = express.Router();

// GET /api/weather - latest cached weather by city/state
router.get('/', async (req, res) => {
  try {
    const { state, city, limit = 1 } = req.query;
    const filter = {};
    if (state) filter.state = new RegExp(state, 'i');
    if (city) filter.city = new RegExp(city, 'i');

    const items = await WeatherRecord.find(filter)
      .sort({ cachedAt: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, data: items });
  } catch (err) {
    console.error('Error fetching weather:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch weather' });
  }
});

module.exports = router;
