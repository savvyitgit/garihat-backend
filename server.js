const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'GariHat BD API is running!' });
});

// Listings route
app.get('/api/listings', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Toyota Corolla Axio',
      year: 2019,
      price: 1800000,
      location: 'Dhaka',
      fuel: 'Petrol',
      brand: 'Toyota'
    },
    {
      id: 2,
      title: 'Honda Civic',
      year: 2018,
      price: 2200000,
      location: 'Chittagong',
      fuel: 'Petrol',
      brand: 'Honda'
    },
    {
      id: 3,
      title: 'Toyota Premio',
      year: 2020,
      price: 2500000,
      location: 'Dhaka',
      fuel: 'Hybrid',
      brand: 'Toyota'
    }
  ]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});