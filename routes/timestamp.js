const express = require('express');

const {
  processDate,
  noDate,
} = require('../controllers/timestamp');

const router = express.Router();

router.route('/:date').get(processDate);
router.route('/').get(noDate);

module.exports = router;
