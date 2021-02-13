// import all models
const Photo = require('./Photo');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Photo, {
  foreignKey: 'user_id'
});

Photo.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Photo, {
  through: Vote,
  as: 'voted_photos',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Photo.belongsToMany(User, {
  through: Vote,
  as: 'voted_photos',
  foreignKey: 'photo_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Photo, {
  foreignKey: 'photo_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Photo.hasMany(Vote, {
  foreignKey: 'photo_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Photo, {
  foreignKey: 'photo_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Photo.hasMany(Comment, {
  foreignKey: 'photo_id'
});

module.exports = { User, Photo, Vote, Comment };
