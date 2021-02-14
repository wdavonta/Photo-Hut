const router = require('express').Router();
const { Photo } = require('../../models');

// GET /api/photos
router.get('/', (req, res) => {
    Photo.findAll()
    .then(dbPhotoData => res.json(dbPhotoData))
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;