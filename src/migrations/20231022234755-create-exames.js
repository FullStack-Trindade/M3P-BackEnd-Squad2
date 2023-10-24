"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration}  */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exames", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_exame: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      data_exame: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      hora_exame: {
        type: DataTypes.TIME(6),
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tipo_exame: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      laboratorio: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      docurl: {
        type: Sequelize.STRING(32),
      },
      resultados: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pacientes",
          key: "id",
        },
      },
      status_sistema: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("exames");
  },
};
