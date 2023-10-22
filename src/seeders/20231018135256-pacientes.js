"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const enderecos = await queryInterface.bulkInsert("enderecos", [
      {
        cep: "12345-678",
        cidade: "São Paulo",
        estado: "SP",
        logradouro: "Rua das Flores",
        numero: "123",
        complemento: "Apto 4",
        bairro: "Jardim das Rosas",
        ponto_referencia: "Próximo à escola",
      },
      {
        cep: "54321-987",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        logradouro: "Avenida das Palmeiras",
        numero: "456",
        complemento: "Casa",
        bairro: "Centro",
        ponto_referencia: "Próximo ao mercado"
      },
      {
        cep: "98765-432",
        cidade: "Belo Horizonte",
        estado: "MG",
        logradouro: "Rua das Árvores",
        numero: "789",
        complemento: "Apartamento 1A",
        bairro: "Jardim das Águas",
        ponto_referencia: "Próximo à praça"
      },
    ]);


    return queryInterface.bulkInsert("pacientes", [
      {
        nome_completo: "João da Silva",
        genero: "MASCULINO",
        data_nascimento: "1990-05-15",
        cpf: "123.456.789-01",
        rg: "567890",
        estado_civil: "CASADO",
        telefone: "(11) 1234-5678",
        email: "joao.silva@example.com",
        naturalidade: "São Paulo",
        contato_emergencia: "(11) 9876-5432",
        lista_alergias: "Nenhuma",
        lista_cuidados: "Nenhum",
        nome_convenio: "Plano de Saúde ABC",
        numero_convenio: "12345",
        validade_convenio: "2025-12-31",
        status: true,
        endereco_id: 1,
      },
      {
        nome_completo: "Maria Santos",
        genero: "FEMININO",
        data_nascimento: "1985-03-20",
        cpf: "987.654.321-09",
        rg: "432156",
        estado_civil: "CASADO",
        telefone: "(22) 9876-5432",
        email: "maria.santos@example.com",
        naturalidade: "Rio de Janeiro",
        contato_emergencia: "(22) 1234-5678",
        lista_alergias: "Pólen",
        lista_cuidados: "Alérgica a frutos do mar",
        nome_convenio: "Plano de Saúde XYZ",
        numero_convenio: "54321",
        validade_convenio: "2026-12-31",
        status: true,
        endereco_id: 2,
      },
      {
        nome_completo: "Carlos Silva",
        genero: "MASCULINO",
        data_nascimento: "1980-08-10",
        cpf: "789.123.456-01",
        rg: "987654",
        estado_civil: "SOLTEIRO",
        telefone: "(33) 8765-4321",
        email: "carlos.silva@example.com",
        naturalidade: "Belo Horizonte",
        contato_emergencia: "(33) 9876-5432",
        lista_alergias: "Nenhuma",
        lista_cuidados: "Nenhum",
        nome_convenio: "Sem convênio",
        numero_convenio: "",
        validade_convenio: null,
        status: true,
        endereco_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pacientes", null, {});
    return queryInterface.bulkDelete("enderecos", null, {});
  },
};
