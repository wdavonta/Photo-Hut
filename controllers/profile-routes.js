const router = require('express').Router();
const sequelize = require('../config/connection');
const { Photo, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log('======================');
    Photo.findAll({
        attributes: [
            'id',
            'photo_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE photo.id = vote.photo_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'photo_id', 'user_id', 'created_at'],
                include: {
                model: User,
                attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPhotoData => {
        const photos = dbPhotoData.map(photo => photo.get({ plain: true }));
        
        res.render('profile', {
            photos,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;