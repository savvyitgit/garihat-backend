const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  fuel: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'Octane'],
    required: true,
  },
  condition: {
    type: String,
    enum: ['Used', 'New'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Car', 'Motorcycle', 'Truck', 'Bus', 'Commercial Vehicle', 'Spare Parts'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  seller: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);