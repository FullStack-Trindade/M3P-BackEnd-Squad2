const Dieta = require("../../models/dietas.model");
const Paciente = require("../../models/paciente");

// Função para cadastrar uma nova dieta
const cadastraDieta = async (req, res) => {
  try {
    const novaDieta = req.body;
    const pacienteId = novaDieta.paciente_id;

    // Verifica se o paciente associado à dieta existe
    const pacienteExistente = await Paciente.findByPk(pacienteId);

    if (!pacienteExistente) {
      return res.status(400).json({ message: "Paciente não encontrado" });
    }

    // Cria a dieta
    const dieta = await Dieta.create(novaDieta);

    return res.status(201).json(dieta);
  } catch (error) {
    console.error("Erro ao cadastrar dieta:", error);
    return res.status(500).json({ message: "Erro ao cadastrar dieta", error });
  }
};

// Função para atualizar uma dieta por ID
const atualizaDieta = async (req, res) => {
  const dietaId = req.params.id;
  const dadosAtualizados = req.body;

  try {
    // Verifica se a dieta com o ID especificado existe
    const dietaExistente = await Dieta.findByPk(dietaId);

    if (!dietaExistente) {
      return res.status(400).json({ message: "Dieta não encontrada" });
    }

    // Atualiza a dieta
    await Dieta.update(dadosAtualizados, {
      where: { id: dietaId },
    });

    return res.status(201).json({ message: "Dieta atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar dieta:", error);
    return res.status(500).json({ message: "Erro ao atualizar dieta", error });
  }
};

// Função para listar todas as dietas 
const listaDietas = async (req, res) => {
  try {
    const dietas = await Dieta.findAll();
    return res.status(200).json(dietas);
  } catch (error) {
    console.error("Erro ao listar dietas:", error);
    return res.status(500).json({ message: "Erro ao listar dietas", error });
  }
};

// Função para listar todas as dietas e um paciente específico 
const listaDietasPorPaciente = async (req, res) => {
  try {
    const nomePaciente = req.params.nomePaciente;
    
    // Implemente a lógica para buscar o ID do paciente com base no nome
    const paciente = await Paciente.findOne({ where: { nome_completo: nomePaciente } });

    if (!paciente) {
      return res.status(400).json({ message: "Paciente não encontrado" });
    }

    const dietas = await Dieta.findAll({ where: { paciente_id: paciente.id } });

    if (dietas.length === 0) {
      return res.status(400).json({ message: "O paciente não tem nenhuma dieta" });
    }

    return res.status(200).json(dietas);
  } catch (error) {
    console.error("Erro ao listar dietas de um paciente:", error);
    return res.status(500).json({ message: "Erro ao listar dietas de um paciente", error });
  }
};

// Função para excluir uma dieta por ID
const excluiDieta = async (req, res) => {
  const dietaId = req.params.id;

  try {
    // Verifica se a dieta com o ID especificado existe
    const dietaExistente = await Dieta.findByPk(dietaId);

    if (!dietaExistente) {
      return res.status(400).json({ message: "Dieta não encontrada" });
    }

    // Exclui a dieta
    await Dieta.destroy({ where: { id: dietaId } });

    return res.status(202).json({ message: "Dieta excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir dieta:", error);
    return res.status(500).json({ message: "Erro ao excluir dieta", error });
  }
};

module.exports = {
  cadastraDieta,
  atualizaDieta,
  listaDietas,
  excluiDieta,
  listaDietasPorPaciente,
};
