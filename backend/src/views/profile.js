const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../util/auth');
const router = express.Router();

// GET /api/profile - Get user profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// PUT /api/profile - Update user profile
router.put('/', verifyToken, async (req, res) => {
  try {
    const {
      name,
      age,
      address,
      contactNumber,
      preferences
    } = req.body;

    const updateData = {};
    
    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (address) updateData.address = address;
    if (contactNumber) updateData.contactNumber = contactNumber;
    if (preferences) updateData.preferences = preferences;

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// POST /api/profile - Create user profile (first time login)
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      age,
      address,
      contactNumber,
      preferences
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUid: req.user.uid });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user = new User({
      firebaseUid: req.user.uid,
      email: req.user.email,
      name,
      phoneNumber,
      age,
      address,
      contactNumber,
      preferences
    });

    await user.save();

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ success: false, error: 'Failed to create profile' });
  }
});

module.exports = router;