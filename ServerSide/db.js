
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('Connected to MySQL Database'))
  .catch((error) => console.error('Unable to connect to database:', error));

module.exports = sequelize;
