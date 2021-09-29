const Event = require('./Event');
const User = require('./User');
const Vote = require('./Vote');
const Category = require('./Category');

// create associations
User.hasMany(Event, {
  foreignKey: 'admin'
});

Event.belongsTo(User, {
  foreignKey: 'admin',
  onDelete: 'SET NULL'
});

User.belongsToMany(Event, {
  through: Vote,
  as: 'voted_events',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Event.belongsToMany(User, {
  through: Vote,
  as: 'voted_events',
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Event, {
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Event.hasMany(Vote, {
  foreignKey: 'event_id'
});

Category.hasMany(Event, {
  foreignKey: 'event_category',
  onDelete: 'SET NULL'
});

module.exports = { User, Event, Vote, Category};