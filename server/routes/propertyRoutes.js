import express from 'express';
import { getAllProperties, createProperty, searchProperties, getPropertyById } from '../controllers/propertyController.js';
import propertyMiddleware from '../middleware/propertyMiddleware.js';

const router = express.Router();

// Apply the middleware to all property routes
router.use(propertyMiddleware);

// Route to get all properties
router.get('/all', getAllProperties);

// Route to create a new property
router.post('/', createProperty);

// Route to search properties by address
router.get('/search', searchProperties);

// Route to get a property by _id
router.get('/:id', getPropertyById);

export default router;