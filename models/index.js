const Event = require('./Event');
const User = require('./User');
const Vote = require('./Vote');
const Category = require('./Category');

// create associations
User.hasMany(Event, {
  foreignKey: 'interested_in'
});

User.hasMany(Event, {
  foreignKey: 'attending'
});

Event.belongsToMany(User, {
  foreignKey: 'admin',
  onDelete: 'SET NULL'
});

User.belongsToMany(Event, {
  through: Vote,
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Event.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Event, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Event.hasMany(Vote, {
  foreignKey: 'post_id'
});

Event.belongsToMany(Category, {
  foreignKey: 'category',
  onDelete: 'SET NULL'
});

Category.hasMany(Event, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

module.exports = { User, Event, Vote, Category};