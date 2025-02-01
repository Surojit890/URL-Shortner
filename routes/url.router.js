const express = require('express');
const { HandleUrl,HandleAnalytics } = require('../controllers/url');

const router = express.Router();

router.post('/',HandleUrl)

router.get('/analytics/:shortID',HandleAnalytics )

module.exports = router;