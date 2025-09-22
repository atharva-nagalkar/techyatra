const mongoose = require('mongoose');

const forecastSchema = new mongoose.Schema({
  date: Date,
  minTempC: Number,
  maxTempC: Number,
  condition: String,
}, { _id: false });

const weatherRecordSchema = new mongoose.Schema({
  city: { type: String, index: true },
  state: { type: String, index: true },
  currentTempC: Number,
  condition: String,
  humidity: Number,
  windKph: Number,
  forecast: [forecastSchema],
  source: { type: String, default: 'cache' },
  cachedAt: { type: Date, default: Date.now },
}, { timestamps: true });

weatherRecordSchema.index({ state: 1, city: 1, cachedAt: -1 });

module.exports = mongoose.model('WeatherRecord', weatherRecordSchema);
