import Property from '../models/Property.js';

// Get all properties
export const getAllProperties = async (req, res) => {
  console.log("Received request to get all properties");
  try {
    const properties = await Property.find();
    console.log("Properties retrieved:", properties);
    res.json(properties);
  } catch (err) {
    console.error("Error retrieving properties:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Create a new property
export const createProperty = async (req, res) => {
  console.log("Received request to create a new property with data:", req.body);
  const property = new Property(req.body);
  try {
    const newProperty = await property.save();
    console.log("New property created:", newProperty);
    res.status(201).json(newProperty);
  } catch (err) {
    console.error("Error creating property:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// Search properties by address
export const searchProperties = async (req, res) => {
  const query = req.query.query;
  console.log("Received search query:", query); // Log the search query
  try {
    const properties = await Property.find({ propertyAddress: new RegExp(query, 'i') });
    console.log("Search results:", properties); // Log the search results
    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(properties);
  } catch (err) {
    console.error("Error searching properties:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get a property by _id
export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  console.log("Received request to get property by _id:", id); // Log the _id
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    console.log("Property retrieved:", property); // Log the retrieved property
    res.json(property);
  } catch (err) {
    console.error("Error retrieving property:", err.message);
    res.status(500).json({ message: err.message });
  }
};