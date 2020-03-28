const express = require('express')
const articleRoutes = require('./article.route.js');
const authRoutes = require('./auth.route.js');
const isAuthenticated  = require('../middlewares/authenticate');
const classRoutes  = require('./class.route');
const BooksRoutes  = require('./books.route');
const startRoutes = require('./start.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/start', startRoutes);
router.use('/article-list', isAuthenticated, articleRoutes);
router.use('/enc', isAuthenticated, articleRoutes);
router.use('/class', classRoutes);
router.use('/books', BooksRoutes);

module.exports = router;