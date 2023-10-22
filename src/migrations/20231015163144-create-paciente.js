'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pacientes', {
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
        type: Sequelize.ENUM('MASCULINO', 'FEMININO', 'OUTRO'),
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
        type: Sequelize.STRING,
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
        allowNull: true,
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'enderecos', // Nome da tabela de endereços
          key: 'id', // Nome da coluna de destino em enderecos
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pacientes');
  },
};