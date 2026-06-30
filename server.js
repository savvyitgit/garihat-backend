const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Listing = require('./models/Listing');
const { upload } = require('./cloudinary');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('MongoDB Error:', err));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'GariHat BD API is running!' });
});

// GET all listings
app.get('/api/listings', async (req, res) => {
  try {
    const { brand, category, location, condition } = req.query;
    const filter = {};
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (condition) filter.condition = condition;
    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single listing
app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new listing
app.post('/api/listings', async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Image upload route
app.post('/api/upload', upload.array('images', 4), (req, res) => {
  try {
    const urls = req.files.map(file => file.path);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});