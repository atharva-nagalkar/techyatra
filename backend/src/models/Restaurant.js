const mongoose = require('mongoose');

const priceRangeSchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
}, { _id: false });

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  cuisines: [String],
  city: { type: String, index: true },
  state: { type: String, index: true },
  address: String,
  rating: { type: Number, min: 0, max: 5, default: 0 },
  priceRange: priceRangeSchema,
  phone: String,
  website: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

restaurantSchema.index({ state: 1, city: 1, rating: -1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);
