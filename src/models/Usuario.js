const { INTEGER, STRING, ENUM, BOOLEAN } = require("sequelize");
const { sequelize } = require("../database/conexao");
const { encriptaSenha } = require("../utils/functions");
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
      type: STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
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
  {
    undescored: true,
    paranoid: true,
    hooks: {
      beforeCreate: encriptaSenha,
      beforeUpdate: encriptaSenha,
    },
  }
);

module.exports = { Usuario };
