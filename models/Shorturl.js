const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
  link: {
    type: String,
    trim: true,
    requires: [true, 'Please add a link'],
    maxlength: 100,
    unique: true,
  },
  number: {
    type: Number,
  },
});

module.exports = mongoose.model('Shorturl', ShortUrlSchema);
