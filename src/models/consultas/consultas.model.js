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
    statusSistema: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { undescored: true, paranoid: true }
);


Paciente.belongsTo(Consulta, {foreignKey : 'consulta_paciente_id'})
module.exports =  Consulta ;