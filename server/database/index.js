const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Load MongoDB URI from .env.local
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI is missing. Add it inside .env.local');
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB Connection successful'))
  .catch((error) => console.log(`Error occurred: ${error}`));
