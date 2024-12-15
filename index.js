import express from 'express';
import cors from 'cors';
import env from 'dotenv';
env.config();

const app = express();
const PORT = process.env.PORT || 3000;

import connectdb from './config/connect.js'; 
import Car from './model/Car.js';  


app.use(cors());
app.use(express.json());

// Add car 
app.post('/addcar', async (req, res) => {
  try {

    const { carName, carId, price, useTime, ownerName, carPictureUrl } = req.body;


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

  
    const newCar = new Car({
      carId,
      carName,
      carPictureUrl,
      price,
      ownerName,
      useTime,
    });

    
    await newCar.save();

  
    res.json({
      success: true,
      message: 'Car data added successfully',
      data: newCar,
    });
  } catch (error) {

    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while adding the car' });
  }
});

// delete api

app.delete('/car/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    // Find and delete the car by carId
    const deletedCar = await Car.findOneAndDelete({ carId });

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      message: 'Car deleted successfully',
      data: deletedCar
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the car',
      error: error.message
    });
  }
});



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

// Health 
app.get('/health', (req, res) => {
  res.send('Server is running');
});

app.use('*', (req, res) => {
  res.json({
    message: `${req.path} not found.`,
  });
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  connectdb();  // Connect to the database
});
