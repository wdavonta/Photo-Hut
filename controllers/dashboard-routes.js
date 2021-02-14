const router = require('express').Router();
const sequelize = require('../config/connection');
const { Photo, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

//displays all photo
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
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
      res.render('dashboard', { photos, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//gets a single photo
router.get('/edit/:id', withAuth, (req, res) => {
  Photo.findByPk(req.params.id, {
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
      if (dbPhotoData) {
        const photo = dbPhotoData.get({ plain: true });
        
        res.render('edit-photo', {
          photo,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
