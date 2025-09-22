const express = require('express');
const EmergencyContact = require('../models/EmergencyContact');
const router = express.Router();

// GET /api/emergency - list contacts with optional filters
router.get('/', async (req, res) => {
  try {
    const { state, city, search, limit = 50, page = 1 } = req.query;
    const filter = { isActive: true };
    if (state) filter.state = new RegExp(state, 'i');
    if (city) filter.city = new RegExp(city, 'i');
    if (search) filter.label = new RegExp(search, 'i');

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const items = await EmergencyContact.find(filter).skip(skip).limit(parseInt(limit)).sort({ label: 1 });
    const total = await EmergencyContact.countDocuments(filter);

    res.json({ success: true, data: items, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) {
    console.error('Error fetching emergency contacts:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch emergency contacts' });
  }
});

module.exports = router;
