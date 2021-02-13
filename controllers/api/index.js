const router = require('express').Router();

const userRoutes = require('./user-routes')
const photoRoutes = require('./photo-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/photos', photoRoutes);
router.use('/comments', commentRoutes);

module.exports = router;