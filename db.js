const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DATABASE_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

module.exports = mongoose;