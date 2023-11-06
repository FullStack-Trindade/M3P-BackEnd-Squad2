const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../database/conexao")
const Paciente = require("./paciente.js")

const Exercicio = sequelize.define(
	"exercicios",
	{
		id: {
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
			type: DataTypes.NUMERIC(5, 2),
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
		paciente_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "pacientes",
				key: "id",
			},
		},
	},

	{ undescored: true, paranoid: true }
)

// Paciente.hasMany(Exercicio, { foreignKey: "paciente_id" })
// Exercicio.belongsTo(Paciente, { foreignKey: 'paciente_id'})

module.exports = Exercicio