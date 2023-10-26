const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const conexao = new Sequelize(DB_CONFIG);

const Endereco = require("./endereco");

const Paciente = conexao.define("pacientes", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_completo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 64],
    },
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  rg: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [0, 20],
    },
  },
  estado_civil: {
    type: Sequelize.ENUM("SOLTEIRO","CASADO", "DIVORCIADO", "VIUVO"),
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  naturalidade: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 64],
    },
  },
  contato_emergencia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lista_alergias: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lista_cuidados: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nome_convenio: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  numero_convenio: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  validade_convenio: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  endereco_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Paciente.belongsTo(Endereco, { foreignKey: 'endereco_id' });

module.exports = Paciente;
