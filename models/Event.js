const{Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    event_name:{
      type:DataTypes.STRING,
      allowNull: false
    },
    admin:{
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    location:{
      type:DataTypes.STRING
    },
    zip:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        len:[4]
      }
    },
    category:{
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event'
  }
);

module.exports = Event;
