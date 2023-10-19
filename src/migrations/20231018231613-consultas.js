"use strict";
const { DataTypes, INTEGER, STRING, BOOLEAN, DATE } = require("sequelize");

/** @type {import('sequelize-cli').Migration}  */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("consultas", {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      motivo_consulta: {
        type: STRING(64),
        allowNull: false,
      },
      data_consulta: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora_consulta: {
        type: DataTypes.TIME(6),
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      descricao_problema: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      medicacao: {
        type: STRING,
      },
      dosagem: {
        type: STRING(256),
        allowNull: false,
      },
      status_sistema: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("consultas");
  },
};
