const router = require('express').Router();
const sequelize = require('../config/connection');
const { Photo, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('==========PROFILE============');
    Photo.findAll({
        where: {
            user_id: req.session.user_id
        },
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
        const username = photos[1].user.username;
        const bio = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quam accusamus. Saepe aspernatur excepturi in! Reprehenderit repudiandae rerum dolore laboriosam quisquam voluptatibus porro atque, quae inventore tempora, facilis laborum qui!';
        const profPic = "https://picsum.photos/200/400";
        const displayName = 'Sample User'

        const profile = {profPic: profPic, displayName: displayName, bio: bio}

        res.render('profile', {
            profile,
            photos,
            loggedIn: true,
            myProfile: true,
            username
        });
    })
    .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

// load a different users profile
router.get('/:id', (req, res) => {
    console.log('==========USER PROFILE============');
    Photo.findAll({
        where: {
            user_id: req.params.id
        },
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
        let photos = {}
        if (dbPhotoData) {
            photos = dbPhotoData.map(photo => photo.get({ plain: true }));
        }

        // temp data until profile db is running
        const bio = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quam accusamus. Saepe aspernatur excepturi in! Reprehenderit repudiandae rerum dolore laboriosam quisquam voluptatibus porro atque, quae inventore tempora, facilis laborum qui!';
        const profPic = "https://picsum.photos/800/400";
        const displayName = 'Other User'

        const profile = {profPic: profPic, displayName: displayName, bio: bio}

        res.render('profile', {
            profile,
            photos,
            loggedIn: true,
            myProfile: false,
        });
    })
    .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;