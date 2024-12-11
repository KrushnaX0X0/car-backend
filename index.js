import express from 'express';
import cors from 'cors';
import env from 'dotenv';
env.config();

const app = express();
const PORT = process.env.PORT || 3000;

import connectdb from './config/connect.js';  // Your DB connection module
import Car from './model/Car.js';  // Your Car model

// Middleware setup
app.use(cors());
app.use(express.json());

// Add car route
app.post('/addcar', async (req, res) => {
  try {
    // Extract data from the request body
    const { carName, carId, price, useTime, ownerName, carPictureUrl } = req.body;

    // Validate that all required fields are provided
    if (!carName) {
      return res.json({ success: false, message: 'Car name is required' });
    }
    if (!carId) {
      return res.json({ success: false, message: 'Car ID is required' });
    }
    if (!price) {
      return res.json({ success: false, message: 'Price is required' });
    }
    if (!useTime) {
      return res.json({ success: false, message: 'Use time is required' });
    }
    if (!ownerName) {
      return res.json({ success: false, message: 'Owner name is required' });
    }
    if (!carPictureUrl) {
      return res.json({ success: false, message: 'Car picture URL is required' });
    }

    // Create a new Car instance using the data from the request body
    const newCar = new Car({
      carId,
      carName,
      carPictureUrl,
      price,
      ownerName,
      useTime,
    });

    // Save the new car to the database
    await newCar.save();

    // Send a success response
    res.json({
      success: true,
      message: 'Car data added successfully',
      data: newCar,
    });
  } catch (error) {
    // Catch any errors and send a 500 status with an error message
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while adding the car' });
  }
});

// Route for getting all cars (example)
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();  // Fetch all cars from the database
    res.json({
      success: true,
      message: 'All cars fetched successfully',
      data: cars,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the cars' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.send('Server is running');
});

// Catch-all route for undefined routes
app.use('*', (req, res) => {
  res.json({
    message: `${req.path} not found.`,
  });
});

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  connectdb();  // Connect to the database
});
