const{Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    category_name:{
      type:DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category'
  }
);

const userdata = [
  {category_name:"environmental"},
  {category_name:"fundraising/charity"},
  {category_name:"education"},
  {category_name:"animals"},
  {category_name:"social work"}
]

const seedCategories = () => Category.bulkCreate(userdata);
seedCategories

module.exports = Category;