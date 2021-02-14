const router = require('express').Router();
const sequelize = require('../config/connection');
const { Photo, Comment, User } = require('../models');

router.get('/', (req, res) => {
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
            }
        ]
    })
        .then(dbPhotoData => {
            // pass a single post object into the homepage template
            const posts = dbPostData.map(photo => photo.get({ plain: true }));

            res.render('profile', { photos });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;