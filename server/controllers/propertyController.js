import Property from '../models/Property.js';

// Get all properties
export const getAllProperties = async (req, res) => {

  console.log("find all properties");
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new property
export const createProperty = async (req, res) => {
  const property = new Property({
    propertyAddress: req.body.propertyAddress,
    propertyType: req.body.propertyType,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    purchasePrice: req.body.purchasePrice,
    purchaseDate: req.body.purchaseDate,
    assessedValue: req.body.assessedValue,
    assessmentDate: req.body.assessmentDate,
    rentalIncome: req.body.rentalIncome,
    propertySize: req.body.propertySize,
    sizeUnit: req.body.sizeUnit,
    yearBuilt: req.body.yearBuilt,
    description: req.body.description,
    amenities: req.body.amenities,
    propertyManager: req.body.propertyManager,
  });

  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single property by address
export const getPropertyByAddress = async (req, res) => {

  console.log("find all properties");

  try {
    const property = await Property.findOne({ propertyAddress: req.params.address });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};