const { INTEGER, STRING, ENUM, BOOLEAN } = require("sequelize");
const { sequelize } = require("../database/conexao");

const Usuario = sequelize.define(
  "usuarios",
  {
    usuarioId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nomeCompleto: {
      type: STRING(64),
      allowNull: false,
    },
    genero: {
      type: ENUM("FEMININO", "MASCULINO", "OUTRO"),
      allowNull: false,
    },
    cpf: {
      type: STRING(11),
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: STRING(12),
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    senha: {
      type: STRING,
      allowNull: false,
    },
    tipo: {
      type: ENUM("ADMINISTRADOR", "MEDICO", "ENFERMEIRO"),
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

module.exports = { Usuario };
