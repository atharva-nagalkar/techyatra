const express = require('express');
const Hotel = require('../models/Hotel');
const router = express.Router();

// GET /api/hotels - list with filters
router.get('/', async (req, res) => {
  try {
    const { state, city, minPrice, maxPrice, minRating, search, limit = 20, page = 1 } = req.query;

    const filter = { isActive: true };
    if (state) filter.state = new RegExp(state, 'i');
    if (city) filter.city = new RegExp(city, 'i');
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };
    if (minPrice || maxPrice) {
      filter['priceRange.min'] = {};
      if (minPrice) filter['priceRange.min'].$gte = parseInt(minPrice);
      if (maxPrice) filter['priceRange.min'].$lte = parseInt(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const items = await Hotel.find(filter).skip(skip).limit(parseInt(limit)).sort({ rating: -1, createdAt: -1 });
    const total = await Hotel.countDocuments(filter);

    res.json({ success: true, data: items, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch hotels' });
  }
});

// GET /api/hotels/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Hotel.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Hotel not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error fetching hotel:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch hotel' });
  }
});

module.exports = router;
