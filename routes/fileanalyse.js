const express = require('express');
const multer = require('multer');
var upload = multer();

const { getInfo } = require('../controllers/fileanalyse');

const router = express.Router();

router.route('/').post(upload.single('upfile'), getInfo);

module.exports = router;
