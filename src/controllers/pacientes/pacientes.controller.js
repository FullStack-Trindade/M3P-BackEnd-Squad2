const Paciente = require('../../models/paciente');
const Endereco = require('../../models/endereco'); 

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


//modelo do json apagar depois
// {
//   "nome_completo": "João da Silva",
//   "genero": "MASCULINO",
//   "data_nascimento": "1990-05-15",
//   "cpf": "12345678901",
//   "rg": "567890",
//   "estado_civil": "CASADO",
//   "telefone": "(11) 1234-5678",
//   "email": "joao.silva@example.com",
//   "naturalidade": "São Paulo",
//   "contato_emergencia": "(11) 9876-5432",
//   "lista_alergias": "Nenhuma",
//   "lista_cuidados": "Nenhum",
//   "nome_convenio": "Plano de Saúde ABC",
//   "numero_convenio": "12345",
//   "validade_convenio": "2025-12-31",
//   "status": true,
//   "endereco": {
//     "cep": "12345-678",
//     "cidade": "São Paulo",
//     "estado": "SP",
//     "logradouro": "Rua das Flores",
//     "numero": "123",
//     "complemento": "Apto 4",
//     "bairro": "Jardim das Rosas",
//     "ponto_referencia": "Próximo à escola"
//   }
// }

module.exports = {
  cadastraPaciente,
};