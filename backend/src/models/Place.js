const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['tourist', 'trekking', 'shopping', 'food', 'hotel', 'transport', 'emergency']
  },
  tags: [String],
  images: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    userId: String,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  contact: {
    phone: String,
    email: String
  },
  website: String,
  timings: {
    open: String,
    close: String,
    days: [String]
  },
  priceRange: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'INR' }
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create geospatial index
placeSchema.index({ location: '2dsphere' });
placeSchema.index({ category: 1, state: 1, city: 1 });
placeSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Place', placeSchema);