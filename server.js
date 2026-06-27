const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

// Listings route
app.get('/api/listings', (req, res) => {
  res.json([
    { id: 1, title: 'Toyota Corolla Axio', year: 2019, price: 1800000, location: 'Dhaka', fuel: 'Petrol', brand: 'Toyota' },
    { id: 2, title: 'Honda Civic', year: 2018, price: 2200000, location: 'Chittagong', fuel: 'Petrol', brand: 'Honda' },
    { id: 3, title: 'Toyota Premio', year: 2020, price: 2500000, location: 'Dhaka', fuel: 'Hybrid', brand: 'Toyota' },
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Single listing route
app.get('/api/listings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const listing = [
    { id: 1, title: 'Toyota Corolla Axio', year: 2019, price: 1800000, location: 'Dhaka', fuel: 'Petrol', brand: 'Toyota' },
    { id: 2, title: 'Honda Civic', year: 2018, price: 2200000, location: 'Chittagong', fuel: 'Petrol', brand: 'Honda' },
    { id: 3, title: 'Toyota Premio', year: 2020, price: 2500000, location: 'Dhaka', fuel: 'Hybrid', brand: 'Toyota' },
  ].find((car) => car.id === id);

  if (!listing) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  res.json(listing);
});