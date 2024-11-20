const propertyMiddleware = (req, res, next) => {
  // Logging the request method and URL
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Example validation: Check if the request body contains a propertyAddress
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.propertyAddress) {
      return res.status(400).json({ message: 'Property address is required' });
    }
  }

  // Call the next middleware or route handler
  next();
};

export default propertyMiddleware;