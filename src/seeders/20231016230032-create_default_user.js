"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("usuarios", [
      {
        nome_completo: "Administrador",
        genero: "OUTRO",
        cpf: "22233311144",
        telefone: "48991337783",
        email: "admin@bemlab.com.br",
        senha: bcrypt.hashSync("admin123", bcrypt.genSaltSync(10)),
        tipo: "ADMINISTRADOR",
        status_sistema: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("usuarios", null, {});
  },
};
