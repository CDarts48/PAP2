import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import setupMiddleware from './middleware/middleware.js'; // General middleware setup
import propertiesRoutes from './routes/propertyRoutes.js'; // Import properties routes
import Property from './models/Property.js'; // Import Property model

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Setup general middleware
setupMiddleware(app);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000 // 45 seconds
})
  .then(async () => {
    console.log('Database connected successfully');
    await Property.createIndexes(); // Ensure indexes are created
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Use routes
app.use('/properties', propertiesRoutes);

// Define a root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});