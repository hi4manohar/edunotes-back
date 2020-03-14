const express = require('express')
const articleRoutes = require('./article.route.js');
const authRoutes = require('./auth.route.js');

const router = express.Router();

router.use('/article-list', articleRoutes);
router.use('/enc', articleRoutes);
router.use('/auth', authRoutes);

module.exports = router;