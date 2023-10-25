const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../database/conexao")

const Exercicio = sequelize.define(
	"exercicios",
	{
		exercicioId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nomeSerie: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		dataExercicio: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		horaExercicio: {
			type: DataTypes.TIME(6),
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		tipoExercicio: {
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
		qtdPorSemana: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		descricao: {
			type: Sequelize.STRING(1000),
			allowNull: false,
		},
		statusSistema: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true,
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
	},
	{
		undescored: true,
		paranoid: true,
	}
)

module.exports = { Exercicio }