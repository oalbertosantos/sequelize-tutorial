const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('express_api', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;