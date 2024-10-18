// middleware.js
import express from 'express';

const setupMiddleware = (app) => {
  app.use(express.json());
  // Add other middleware here
};

export default setupMiddleware;