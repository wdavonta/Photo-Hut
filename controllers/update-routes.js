const router = require('express').Router();
const sequelize = require('../config/connection');
const { Photo, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

//updates the user information
router.put('/', (req, res) => {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.session.user_id,
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  module.exports = router;