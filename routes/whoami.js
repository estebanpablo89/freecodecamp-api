const express = require('express');

const { info } = require('../controllers/whoami');

const router = express.Router();

router.route('/').get(info);

module.exports = router;
