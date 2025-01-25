
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[A-Za-z\s]+$/, 
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Email validation
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[6-9]\d{9}$/,
    },
  },
  profileImage: {
    type: DataTypes.STRING, 
  },
}, { timestamps: true });

module.exports = User;
