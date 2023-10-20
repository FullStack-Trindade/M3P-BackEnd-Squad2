const { INTEGER, STRING, BOOLEAN, DataTypes } = require("sequelize");
const { sequelize } = require("../../database/conexao");

const Paciente = require('../paciente')

const Exame = sequelize.define(
  "exame",
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
    statusSistema: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: Paciente, 
        key: 'id'
      }
    }
  },
  { undescored: true, paranoid: true }
);

Exame.hasMany(Paciente,{foreignKey : 'pacienteId'})
Paciente.belongsTo(Exame, {foreignKey : 'pacienteId'})
module.exports = Exame ;  
