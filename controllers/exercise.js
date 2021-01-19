const Exercise = require('../models/Exercise');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const dateFormat = require('dateformat');

exports.createUser = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });

  if (!user) {
    user = await User.create(req.body);
    res.json({
      username: user.username,
      _id: user._id,
    });
  } else {
    res.send('Username already taken');
  }
});

exports.createExercise = asyncHandler(async (req, res, next) => {
  user = await User.findOne({ _id: req.body.userId });
  if (!user) {
    res.send('Username not found');
  } else {
    req.body.username = user.username;
    if (!req.body.date) {
      req.body.date = Date.now();
    }
    exercise = await Exercise.create(req.body);
    exercise._id = exercise.userId;
    exercise.userId = exercise.__v = undefined;
    const dateWorked = dateFormat(
      exercise.date,
      'ddd mmm dd yyyy'
    );

    exercise = exercise.toObject();
    exercise.date = dateWorked;
    console.log(exercise);

    res.json(exercise);
  }
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find({}, 'username');
  res.status(200).json(users);
});

exports.findExercises = asyncHandler(async (req, res, next) => {
  let user = await User.findOne(
    { _id: req.query.userId },
    'username'
  );
  user = user.toObject();
  //exercises = exercises.toObject();
  let query = { userId: req.query.userId };
  if (req.query.from && req.query.to) {
    query.date = { $gt: req.query.from, $lt: req.query.to };
  }
  console.log(query);
  order = Exercise.find(query).select(
    'description duration date -_id'
  );

  if (req.query.limit) {
    order = order.limit(parseInt(req.query.limit));
  }
  user.log = await order;
  user.count = user.log.length;
  res.status(200).json(user);
});
