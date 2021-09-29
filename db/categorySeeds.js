const { Category } = require('../models');

const userdata = [
  {category_name:"beautification"},
  {category_name:"charity"},
  {category_name:"education"},
  {category_name:"fund raising"},
  {category_name:"social work"}
]

const seedCategories = () => Category.bulkCreate(userdata);

module.exports = seedCategories;