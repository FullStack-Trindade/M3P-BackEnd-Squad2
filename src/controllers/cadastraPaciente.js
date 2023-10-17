const Paciente = require('../models/paciente');
const Endereco = require('../models/endereco'); 

const cadastraPaciente = async (req, res) => {
  const novoPaciente = req.body;
  const enderecoData = novoPaciente.endereco; 

  try {
    // Cria endereço na tabela de endereços
    const endereco = await Endereco.create(enderecoData);

    // Obtém o ID do endereço recém-criado
    const endereco_id = endereco.id;

    // Associa o ID do endereço ao paciente
    novoPaciente.endereco_id = endereco_id;

    // Cria o paciente com a associação do endereço
    const paciente = await Paciente.create(novoPaciente);

    return res.status(201).json(paciente);
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar paciente', error });
  }
};

module.exports = cadastraPaciente;