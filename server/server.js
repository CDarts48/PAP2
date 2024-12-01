import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import propertiesRoutes from './routes/propertyRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected successfully');
    const db = mongoose.connection.db;
    console.log(`Connected to database: ${db.databaseName}`);
    db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
      } else {
        console.log('Collections:');
        collections.forEach(collection => console.log(` - ${collection.name}`));
      }
    });
  })
  .catch(err => console.error('Database connection error:', err));

app.use('/properties', propertiesRoutes);

// Serve the index.html file
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});