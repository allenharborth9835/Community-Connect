const{Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {
  static upvote(body, models){
  return models.Vote.create({
    user_id: body.user_id,
    event_id: body.event_id
  }).then(()=>{
    return Post.findOne({
      where:{
        id: body.event_id
      },
      attributes:[
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.event_id)'), 'vote_count']
      ],
      include: [
        {
          model: models.Comment,
          attributes: ['id', 'comment_text', 'event_id', 'user_id', 'created_at'],
          include: {
            model: models.User,
            attributes: ['username']
          }
        }
      ]
    });
  });
}}

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
    event_category:{
      type:DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'event'
  }
);

module.exports = Event;
