const categorySeeds = require('./categorySeeds')

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await categorySeeds()

  process.exit(0);
};

seedAll();