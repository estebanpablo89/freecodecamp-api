const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    requires: [true, 'Please add a name'],
    maxlength: 100,
    unique: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
