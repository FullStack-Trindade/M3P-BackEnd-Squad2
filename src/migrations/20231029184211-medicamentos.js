"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration}  */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_medicamento: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      data_medicamento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora_medicamento: {
        type: DataTypes.TIME(6),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      tipo_medicamento: {
        type: Sequelize.ENUM(
          'CAPSULA',
          'COMPRIMIDO',
          'LIQUIDO',
          'CREME',
          'GEL',
          'INALACAO',
          'INJECAO',
          'SPRAY'
        ),
        allowNull: false,
      },
      quantidade_medicamento: {
        type: Sequelize.DECIMAL(15, 10),
        allowNull: false,
      },
      unidade_medicamento: {
        type: Sequelize.ENUM('mg', 'mcg', 'g', 'mL', '%'),
        allowNull: false,
      },
      observacoes_medicamento: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status_do_sistema: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacientes',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medicamentos');
  },
};
