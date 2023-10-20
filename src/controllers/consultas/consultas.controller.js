const  Consulta  = require("../../models/consultas/consultas.model");
const Paciente = require("../../models/paciente");

const hoje = new Date();
    const hora = hoje.getHours();
    const minutos = hoje.getMinutes();
    const segs = hoje.getSeconds();
    const dataHora = `${hora}:${minutos}:${segs}`;

const criarConsulta = async (request, response) => {
  try {
    const {
      motivoConsulta,
      dataConsulta,
      horaConsulta,
      descricaoProblema,
      medicacao,
      dosagem,
      statusSistema,
    } = request.body;

    const consulta = await Consulta.create({
      motivoConsulta,
      dataConsulta: dataConsulta || new Date(),
      horaConsulta: horaConsulta || dataHora,
      descricaoProblema,
      medicacao,
      dosagem,
      statusSistema,
    });
    console.error(consulta);
    response.status(201).json(consulta);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

const atualizarConsulta = async (request, response) => {
  try {
    const { id } = request.params;

    const {
      motivoConsulta,
      dataConsulta,
      horaConsulta,
      descricaoProblema,
      medicacao,
      dosagem,
      statusSistema,
    } = request.body;

    const consultaExistente = await Consulta.findByPk(id);

    if (!consultaExistente) {
      return response
        .status(400)
        .json({ message: "Consulta não foi encontrado" });
    }

    
    
    const data = {
      motivoConsulta: motivoConsulta || consultaExistente.motivoConsulta,
      dataConsulta: dataConsulta || new Date(),
      horaConsulta: horaConsulta || dataHora,
      descricaoProblema:
        descricaoProblema || consultaExistente.descricaoProblema,
      medicacao: medicacao || consultaExistente.medicacao,
      dosagem: dosagem || consultaExistente.dosagem,
      statusSistema: statusSistema || consultaExistente.statusSistema,
    };

    await Consulta.update(data, { where: { id: id } });
    response
      .status(200)
      .json({ message: "Dados de consulta atualizados com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

const buscarConsultas = async (request, response) => {
  try {
    const consultas = await Consulta.findAll();
    if (!consultas)
      return response
        .status(400)
        .json({ message: "Consultas não encontradas" });
    response.status(200).json(consultas);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

/* Esse endpoint deve ter como Parâmetro da Requisição o ID do Usuário, 
sendo assim se o ID do usuário vier preenchido para o Backend apenas os 
dados atrelados ao usuário desse nome retornará, caso contrário todos os 
dados devem ser retornados. */

const buscaConsulta = async (request, response) => {
  try {
    const consulta = await Consulta.findAll({ include: Paciente.nome_completo })
    if (!consulta)
      return response.status(400).json({ message: "Consulta não encontrada" });
    response.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

const deleteConsulta = async (request, response) => {
  try {
    const id = await Consulta.destroy({
      where: {
        id: request.params.id,
      },
    });

    if (!id) return response.status(400).json({ message: "ID não encontrado" });

    response.status(202).json({ message: "Dados excluídos com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

module.exports = {
  criarConsulta,
  atualizarConsulta,
  buscarConsultas,
  buscaConsulta,
  deleteConsulta,
};
