const { Category } = require('../models');

const userdata = [
  {category_name:"environmental"},
  {category_name:"fundraising/charity"},
  {category_name:"education"},
  {category_name:"animals"},
  {category_name:"social work"}
]

const seedCategories = () => Category.bulkCreate(userdata);

module.exports = seedCategories;