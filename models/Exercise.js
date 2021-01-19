const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    trim: true,
    requires: [true],
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    requires: [true, 'Please add a desc'],
    maxlength: 100,
  },
  duration: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
