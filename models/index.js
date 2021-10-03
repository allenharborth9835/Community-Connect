const Event = require('./Event');
const User = require('./User');
const Vote = require('./Vote');
const Category = require('./Category');
const Attending = require('./Attending');
const Intersed_in = require('./Interested_in');

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

Event.belongsTo(Category,{
  foreignKey: 'event_category',
  onDelete: 'SET NULL'
});

User.belongsToMany(Event, {
  through: Attending,
  as: 'attending_events',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Event.belongsToMany(User, {
  through: Attending,
  as: 'attending_events',
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

Attending.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Attending.belongsTo(Event, {
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

User.hasMany(Attending, {
  foreignKey: 'user_id'
});

Event.hasMany(Attending, {
  foreignKey: 'event_id'
});

User.belongsToMany(Event, {
  through: Intersed_in,
  as: 'intersed_in_events',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Event.belongsToMany(User, {
  through: Intersed_in,
  as: 'intersed_in_events',
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

Intersed_in.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Intersed_in.belongsTo(Event, {
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

User.hasMany(Intersed_in, {
  foreignKey: 'user_id'
});

Event.hasMany(Intersed_in, {
  foreignKey: 'event_id'
});

module.exports = { User, Event, Vote, Category, Attending, Intersed_in };