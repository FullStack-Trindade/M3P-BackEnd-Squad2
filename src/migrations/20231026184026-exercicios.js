'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("exercicios",{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nome_serie: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		data_exercicio: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		hora_exercicio: {
			type: DataTypes.TIME(6),
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		tipo_exercicio: {
			type: Sequelize.ENUM(
				"RESISTENCIA AEROBICA",
				"RESISTENCIA MUSCULAR",
				"FLEXIBILIDADE",
				"FORÇA",
				"AGILIDADE",
				"OUTRO"
			),
			allowNull: false,
		},
		qtd_por_semana: {
			type: DataTypes.NUMERIC(5, 2),
			allowNull: false,
		},
		descricao: {
			type: Sequelize.STRING(1000),
			allowNull: false,
		},
		status_sistema: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		paciente_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "pacientes",
				key: "id",
			},
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},	
		deleted_at: {
			type: Sequelize.DATE,
		  },	
  })
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("exercicios");
  }
};