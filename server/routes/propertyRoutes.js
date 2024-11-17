import express from 'express';
import Property from '../models/Property.js';
import propertyMiddleware from '../middleware/propertyMiddleware.js';

const router = express.Router();

// Use property-specific middleware
router.use(propertyMiddleware);

// Define routes for properties
router.get('/', (req, res) => {
  console.log("HEYOOOO 1");

  res.send('Properties route 1');
});

// Route to get all properties
router.get('/all', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error 423424' });
  }
});

// Route to create a new property
router.post('/', async (req, res) => {
  const property = new Property(req.body);
  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Route to search properties by address
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const properties = await Property.find();
    if (properties.length === 0) {
      return res.status(404).json({ message : 'Property not found' });
    }
    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// // Route to get a single property by address
// router.get('/:address', async (req, res) => {

//   console.log("HEYOOOO 2");

//   try {
//     const property = await Property.findOne({ propertyAddress: req.params.address });
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
//     res.json(property);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error 2' });
//   }
// });

export default router;