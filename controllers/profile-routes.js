const router = require('express').Router();
const sequelize = require('../config/connection');
const { Photo, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('==========PROFILE============');
    
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.session.user_id
        },
        include: [
            {
                model: Photo,
                attributes: ['id', 'title', 'photo_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Photo,
                    attributes: ['title']
                }
            },
            {
                model: Photo,
                attributes: ['title'],
                through: Vote,
                as: 'voted_photos'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        const user = dbUserData.get({ plain: true });
        res.render('profile', {
            user,
            loggedIn: true,
            myProfile: true
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
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
            {
                model: Photo,
                attributes: ['id', 'title', 'photo_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Photo,
                    attributes: ['title']
                }
            },
            {
                model: Photo,
                attributes: ['title'],
                through: Vote,
                as: 'voted_photos'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        const user = dbUserData.get({ plain: true });
        res.render('profile', {
            user,
            loggedIn: req.session.loggedIn,
            myProfile: false
        });
    })
    .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;