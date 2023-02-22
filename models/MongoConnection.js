const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONF, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[ INFO ] Connected to MongoDB'))
  .catch((err) => console.error(err));

const { Schema } = mongoose;

module.exports = Schema