const express = require('express')
const articleRoutes = require('./article.route.js');
const authRoutes = require('./auth.route.js');
const isAuthenticated  = require('../middlewares/authenticate');
const classRoutes  = require('./class.route');
const BooksRoutes  = require('./books.route');
const startRoutes = require('./start.route');
const answersRoutes = require('./answers.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/start', startRoutes);
router.use('/article-list', isAuthenticated, articleRoutes);
router.use('/enc', isAuthenticated, articleRoutes);
router.use('/class', isAuthenticated, classRoutes);
router.use('/books', isAuthenticated, BooksRoutes);
router.use('/answers', isAuthenticated, answersRoutes);

module.exports = router;