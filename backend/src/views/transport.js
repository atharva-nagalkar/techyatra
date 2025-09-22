const express = require('express');
const TransportOption = require('../models/TransportOption');
const router = express.Router();

// GET /api/transport - list with filters
router.get('/', async (req, res) => {
  try {
    const { type, from, to, date, limit = 20, page = 1 } = req.query;
    const filter = { isActive: true };
    if (type) filter.type = type;
    if (from) filter.from = new RegExp(from, 'i');
    if (to) filter.to = new RegExp(to, 'i');
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23,59,59,999);
      filter.departureTime = { $gte: start, $lte: end };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const items = await TransportOption.find(filter).skip(skip).limit(parseInt(limit)).sort({ departureTime: 1 });
    const total = await TransportOption.countDocuments(filter);

    res.json({ success: true, data: items, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) {
    console.error('Error fetching transport options:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch transport options' });
  }
});

// GET /api/transport/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await TransportOption.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Transport option not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error fetching transport option:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch transport option' });
  }
});

module.exports = router;
