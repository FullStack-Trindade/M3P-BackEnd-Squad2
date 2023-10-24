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
  listaDietas,
  excluiDieta,
};
