const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/conexao");

const Paciente = require("./paciente");

const Dieta = sequelize.define("dietas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_dieta: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 100],
    },
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
  horario: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
  tipo: {
    type: DataTypes.ENUM("Low Carb", "Dash", "Paleolítica", "Cetogênica", "Dukan", "Mediterrânea", "Outra"),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status_sistema: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "pacientes",
      key: "id",
    },
  },
}, {
  underscored: true,
});

Dieta.belongsTo(Paciente, { foreignKey: 'paciente_id' });  // Associa a Dieta ao Paciente


module.exports = Dieta;

