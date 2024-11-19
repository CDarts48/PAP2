import express from 'express';
import Property from '../models/Property.js';
// import propertyMiddleware from '../middleware/propertyMiddleware.js';

const router = express.Router();

// Use property-specific middleware
// router.use(propertyMiddleware);

// Route to search properties by address
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const properties = await Property.find({ propertyAddress: new RegExp(query, 'i') });
    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;