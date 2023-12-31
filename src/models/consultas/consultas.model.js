const { INTEGER, STRING, BOOLEAN, DataTypes } = require("sequelize");
const { sequelize } = require("../../database/conexao");
const Paciente = require("../paciente");

const Consulta = sequelize.define("consultas",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    motivoConsulta: {
      type: STRING(64),
      allowNull: false,
    },
    dataConsulta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaConsulta: {
      type: DataTypes.TIME(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    descricaoProblema: {
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
    paciente_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes', 
        key: 'id', 
      },
    statusSistema: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
},{ undescored: true, paranoid: true }
);

Consulta.belongsTo(Paciente, {foreignKey : 'paciente_id'})
Paciente.hasMany(Consulta,{foreignKey : 'paciente_id'})

module.exports =  Consulta ;