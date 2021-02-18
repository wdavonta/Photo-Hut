const router = require('express').Router();
const sequelize = require('../config/connection');
const { Photo, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

//displays all photo
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

      res.render('homepage', {
        photos,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//displays a single photo
router.get('/photo/:id', withAuth, (req, res) => {
  Photo.findOne({
    where: {
      id: req.params.id
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
      if (!dbPhotoData) {
        res.status(404).json({ message: 'No photo found with this id' });
        return;
      }

      const photo = dbPhotoData.get({ plain: true });

      res.render('single-photo', {
        photo,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get('/update', (req, res) => {
  res.render('update');
});

module.exports = router;
