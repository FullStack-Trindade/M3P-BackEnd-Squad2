const { INTEGER, STRING, BOOLEAN, DataTypes } = require("sequelize");
const { sequelize } = require("../../database/conexao");

const Paciente = require("../paciente");

const Exame = sequelize.define(
  "exames",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nomeExame: {
      type: STRING(64),
      allowNull: false,
    },
    dataExame: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaExame: {
      type: DataTypes.TIME(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    tipoExame: {
      type: STRING(32),
      allowNull: false,
    },
    laboratorio: {
      type: STRING(32),
      allowNull: false,
    },
    docurl: STRING,
    resultados: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    paciente_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "pacientes",
        key: "id",
      },
    },
    statusSistema: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { undescored: true, paranoid: true }
);

Exame.belongsTo(Paciente, { foreignKey: "paciente_id" });
Paciente.hasMany(Exame, { foreignKey: "paciente_id" });

module.exports = Exame;
