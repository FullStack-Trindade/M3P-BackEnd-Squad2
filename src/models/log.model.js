// models/logs.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conexao');

const Log = sequelize.define('logs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataHora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Log;