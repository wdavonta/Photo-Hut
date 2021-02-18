//main index for linking all route files together to server.js
const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const profileRoutes = require('./profile-routes.js');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);

module.exports = router;
