const express = require('express')
const articleRoutes = require('./article.route.js');

const router = express.Router();

router.use('/article-list', articleRoutes);

module.exports = router;