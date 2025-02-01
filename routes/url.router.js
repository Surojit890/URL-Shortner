const express = require('express');
const { HandleUrl } = require('../controllers/url');
const router = express.Router();

router.post('/',HandleUrl)

module.exports = router;