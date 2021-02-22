//this file links all the api routs the the main index file to then redirect to server.js
const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const photoRoutes = require('./photo-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/photos', photoRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
