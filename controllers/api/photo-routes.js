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

// POST /api/photos
router.post('/', (req, res) => {
    // expects {"title": "My first pic", "photo_url": "https://via.placeholder.com/150", "user_id": 1}
    Photo.create({
        title: req.body.title,
        photo_url: req.body.photo_url,
        user_id: req.body.user_id
    })
    .then(dbPhotoData => res.json(dbPhotoData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/photos/1
router.delete('/:id', (req, res) => {
    Photo.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPhotoData => {
        if (!dbPhotoData) {
            res.status(404).json({ message: 'No photo found with this id' });
            return;
        }
        res.json(dbPhotoData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;