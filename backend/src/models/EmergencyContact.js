const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  label: { type: String, required: true },
  number: { type: String, required: true },
  description: String,
  city: { type: String, index: true },
  state: { type: String, index: true },
  is24x7: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

emergencyContactSchema.index({ state: 1, city: 1, label: 1 });

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
