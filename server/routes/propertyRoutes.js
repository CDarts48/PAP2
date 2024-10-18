import express from 'express';
import { getAllProperties, createProperty, getPropertyByAddress } from '../controllers/propertyController.js';
import propertyMiddleware from '../middleware/propertyMiddleware.js';
import Property from '../models/Property.js'; // Import the Property model

const router = express.Router();

// Use property-specific middleware
router.use(propertyMiddleware);

// Define routes for properties
router.get('/', (req, res) => {
  res.send('Properties route');
});

// Route to get all properties
router.get('/all', getAllProperties);

// Route to create a new property
router.post('/', createProperty);

// Route to get a single property by address
router.get('/:address', getPropertyByAddress);

export default router;