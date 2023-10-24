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




module.exports = {
  cadastraDieta,
  listaDietas,
};