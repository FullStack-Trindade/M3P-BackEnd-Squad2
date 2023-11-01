const Paciente = require("../../models/paciente");
const Endereco = require("../../models/endereco");
const { Op } = require("sequelize");
const { criarLog } = require('../logs/log.controller');


// Função para cadsatrar um paciente
const cadastraPaciente = async (req, res) => {
  const novoPaciente = req.body;
  const enderecoData = novoPaciente.endereco;

  try {
    // Verifica se o CPF ou email já estão cadastrados o model-querying-basics Op do sequelize
    const pacienteExistente = await Paciente.findOne({
      where: {
        [Op.or]: [{ cpf: novoPaciente.cpf }, { email: novoPaciente.email }],
      },
    });

    if (pacienteExistente) {
      return res.status(409).json({ message: "CPF ou email já cadastrados" });
    }

    // Cria endereço na tabela de endereços
    const endereco = await Endereco.create(enderecoData);

    // Obtém o ID do endereço recém-criado
    const endereco_id = endereco.id;

    // Associa o ID do endereço ao paciente
    novoPaciente.endereco_id = endereco_id;

    // Cria o paciente com a associação do endereço
    const paciente = await Paciente.create(novoPaciente);

    // Crie um log
    await criarLog(req, `cadastrou o paciente ${novoPaciente.nome_completo}`);

    return res.status(201).json(paciente);
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar paciente", error });
  }
};

// Função para atualizar um paciente por ID
const atualizaPaciente = async (req, res) => {
  const pacienteId = req.params.id;
  const dadosAtualizados = req.body;

  try {
    // Verifica se o paciente com o ID especificado existe
    const pacienteExistente = await Paciente.findByPk(pacienteId, {
      include: [{ model: Endereco }],
    });

    if (!pacienteExistente) {
      return res.status(400).json({ message: "Paciente não encontrado" });
    }

    // Validação: Certifique-se de que CPF e RG não estejam presentes nos dados atualizados
    if (dadosAtualizados.cpf || dadosAtualizados.rg) {
      return res.status(400).json({
        message: "Não é permitido atualizar CPF ou RG",
      });
    }

    // Atualize o paciente
    await Paciente.update(dadosAtualizados, {
      where: { id: pacienteId },
    });

    // Atualize os campos do endereço associado, se fornecidos
    if (dadosAtualizados.endereco) {
      await pacienteExistente.endereco.update(dadosAtualizados.endereco);
    }

    //registra ação no log
    await criarLog(req, `atualizou o paciente ${dadosAtualizados.nome_completo}`);

    return res.status(200).json({ message: "Paciente atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar paciente", error });
  }
};

// Função para listar todos os pacientes
const listaPacientes = async (req, res) => {
  try {
    // Busque todos os pacientes incluindo o modelo Endereco relacionado, mas excluindo os campos createdAt e updatedAt
    const pacientes = await Paciente.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Endereco,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    return res.status(200).json(pacientes);
  } catch (error) {
    console.error("Erro ao listar pacientes:", error);
    return res.status(500).json({ message: "Erro ao listar pacientes", error });
  }
};

// Função para consultar um paciente por ID
const consultaPacientePorId = async (req, res) => {
  const pacienteId = req.params.id;

  try {
    // Consulte o paciente pelo ID, incluindo o modelo Endereco relacionado, mas excluindo os campos createdAt e updatedAt
    const paciente = await Paciente.findByPk(pacienteId, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "created_at", "updated_at"],
      },
      include: [
        {
          model: Endereco,
          attributes: {
            exclude: ["createdAt", "updatedAt", "created_at", "updated_at"],
          },
        },
      ],
    });

    if (!paciente) {
      return res.status(400).json({ message: "Paciente não encontrado" });
    }

    return res.status(200).json(paciente);
  } catch (error) {
    console.error("Erro ao consultar paciente por ID:", error);
    return res
      .status(500)
      .json({ message: "Erro ao consultar paciente por ID", error });
  }
};

// Função para excluir um paciente e seu endereço associado
const excluiPaciente = async (req, res) => {
  const pacienteId = req.params.id;

  try {
    // Encontre o paciente pelo ID e inclua o endereço relacionado
    const pacienteExistente = await Paciente.findByPk(pacienteId, {
      include: [{ model: Endereco }],
    });

    if (!pacienteExistente) {
      return res.status(400).json({ message: "Paciente não encontrado" });
    }

    // Exclua o paciente
    await Paciente.destroy({
      where: { id: pacienteId },
    });

    // Exclua o endereço associado
    await Endereco.destroy({
      where: { id: pacienteExistente.endereco.id },
    });

    //registra ação no log
    await criarLog(req, `excluiu o paciente ${pacienteExistente.nome_completo}`);

    return res
      .status(202)
      .json({ message: "Paciente e endereço excluídos com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir paciente:", error);
    return res.status(500).json({ message: "Erro ao excluir paciente", error });
  }
};

module.exports = {
  cadastraPaciente,
  atualizaPaciente,
  listaPacientes,
  consultaPacientePorId,
  excluiPaciente,
};
