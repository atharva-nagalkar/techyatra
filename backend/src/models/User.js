const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 1,
    max: 120
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  contactNumber: {
    type: String,
    required: true
  },
  preferences: {
    categories: [String],
    budget: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' }
    },
    travelStyle: {
      type: String,
      enum: ['budget', 'mid-range', 'luxury', 'adventure', 'cultural', 'relaxation']
    }
  },
  bookmarks: [{
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    addedAt: { type: Date, default: Date.now }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ firebaseUid: 1 });
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);