const router = require('express').Router();

const photoRoutes = require('./photo-routes');

router.use('/photos', photoRoutes);

module.exports = router;