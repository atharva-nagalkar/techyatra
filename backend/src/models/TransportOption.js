const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  type: { type: String, enum: ['flight', 'train', 'bus', 'taxi'], required: true, index: true },
  from: { type: String, required: true, index: true },
  to: { type: String, required: true, index: true },
  operator: String,
  price: { amount: Number, currency: { type: String, default: 'INR' } },
  departureTime: Date,
  arrivalTime: Date,
  durationMinutes: Number,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

transportSchema.index({ type: 1, from: 1, to: 1, departureTime: 1 });

module.exports = mongoose.model('TransportOption', transportSchema);
