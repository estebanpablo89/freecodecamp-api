const express = require('express');

const {
  createUrl,
  findUrl,
} = require('../controllers/shorturl');

const router = express.Router();

router.route('/new').post(createUrl);

router.route('/:number').get(findUrl);

module.exports = router;
