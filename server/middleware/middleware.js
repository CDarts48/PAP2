import express from 'express';
import propertyMiddleware from './propertyMiddleware.js'; // Import propertyMiddleware

const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(propertyMiddleware); // Add propertyMiddleware here
  // Add other middleware here
};

export default setupMiddleware;