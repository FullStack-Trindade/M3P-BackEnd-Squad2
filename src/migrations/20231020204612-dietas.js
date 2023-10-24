"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("dietas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_dieta: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5, 100],
        },
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      horario: {
        type: Sequelize.TIME(6),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM("Low Carb", "Dash", "Paleolítica", "Cetogênica", "Dukan", "Mediterrânea", "Outra"),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_sistema: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pacientes",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("dietas");
  },
};
