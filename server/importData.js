import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Property from './models/Property.js'; // Adjust the path as necessary

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Read JSON file
const data = JSON.parse(fs.readFileSync(path.resolve('Tebo.Properties.updated.json'), 'utf-8'));

// Insert data into the properties collection
const importData = async () => {
  try {
    await Property.insertMany(data);
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();