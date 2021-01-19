const express = require('express');

const {
  createUser,
  getUsers,
  createExercise,
  findExercises,
} = require('../controllers/exercise');

const router = express.Router();

router.route('/new-user').post(createUser);

router.route('/users').get(getUsers);

router.route('/add').post(createExercise);

router.route('/log').get(findExercises);

module.exports = router;
