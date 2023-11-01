const { INTEGER, STRING, ENUM, BOOLEAN } = require("sequelize");
const { sequelize } = require("../database/conexao");
const Configuracoes = sequelize.define(
  "configuracoes",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nomeEmpresa: {
      type: STRING,
      allowNull: false,
    },
    slogan: {
      type: STRING,
      allowNull: true,
    },
    corPrimaria: {
      type: STRING,
      allowNull: false,
    },
    corSecundaria: {
      type: STRING,
      allowNull: false,
    },
    imagemLogo: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    undescored: true,
    paranoid: true,
  }
);

module.exports = { Configuracoes };
