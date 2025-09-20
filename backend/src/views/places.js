const express = require('express');
const Place = require('../models/Place');
const router = express.Router();

// GET /api/places - Get all places with filtering
router.get('/', async (req, res) => {
  try {
    const {
      category,
      state,
      city,
      minPrice,
      maxPrice,
      minRating,
      search,
      limit = 20,
      page = 1
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (state) {
      filter.state = new RegExp(state, 'i');
    }

    if (city) {
      filter.city = new RegExp(city, 'i');
    }

    if (minPrice || maxPrice) {
      filter['priceRange.min'] = {};
      if (minPrice) filter['priceRange.min'].$gte = parseInt(minPrice);
      if (maxPrice) filter['priceRange.min'].$lte = parseInt(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const places = await Place.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1, createdAt: -1 });

    const total = await Place.countDocuments(filter);

    res.json({
      success: true,
      data: places,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch places' });
  }
});

// GET /api/places/:id - Get single place
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    
    if (!place) {
      return res.status(404).json({ success: false, error: 'Place not found' });
    }

    res.json({ success: true, data: place });
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch place' });
  }
});

// GET /api/places/categories - Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Place.distinct('category', { isActive: true });
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// GET /api/places/states - Get all states
router.get('/states', async (req, res) => {
  try {
    const states = await Place.distinct('state', { isActive: true });
    res.json({ success: true, data: states });
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch states' });
  }
});

module.exports = router;