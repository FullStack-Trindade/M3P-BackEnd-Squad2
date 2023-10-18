const { INTEGER, STRING, BOOLEAN, DataTypes } = require("sequelize");
const { sequelize } = require("../database/conexao");

const Exame = sequelize.define(
  "exames",
  {
    exameId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nomeExame: {
      type: STRING(64),
      allowNull: false,
    },
    dataHoraExame: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
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
    statusSistema: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { undescored: true, paranoid: true }
);

module.exports = { Exame };
