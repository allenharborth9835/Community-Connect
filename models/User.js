const{Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create our User model
class User extends Model {
  checkPassword(loginPw){
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//difine table columns and configuration
User.init(
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    username:{
      type:DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    phone_number:{
      type:DataTypes.STRING,
      validate:{
        is: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i
      }
    },
    zip_code:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        len:[4]
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[4]
      }
    },
    interested_in:{
      type:DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    attending:{
      type:DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'events',
        key: 'id'
      }
    }
  },
  {
    hooks:{
      async beforeCreate(newUserData){
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData){
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
