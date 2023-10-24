const Exame = require("../../models/exames/exames.model");
const Paciente = require("../../models/paciente");

const { dataHora, dataFormatada } = require("../../services/dataHora.service");

const criarExame = async (request, response) => {
  try {

    const {
      nomeExame,
      dataExame,
      horaExame,
      tipoExame,
      laboratorio,
      docurl,
      resultados,
      paciente_id,
      statusSistema,
    } = request.body;
    
    const paciente = await Paciente.findByPk(paciente_id);

    if (!paciente) {
      return response.status(400).json({ message: "Paciente não encontrado" });
    }

    const exame = await Exame.create({
      nomeExame,
      dataExame: dataExame || dataFormatada,
      horaExame: horaExame || dataHora,
      tipoExame,
      laboratorio,
      docurl,
      resultados,
      paciente_id,
      statusSistema,
    });
    console.error(exame);
    response.status(201).json(exame);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
      error,
    });
  }
};

const atualizarExame = async (request, response) => {
  try {
    const { id } = request.params;

    const {
      nomeExame,
      dataExame,
      horaExame,
      tipoExame,
      laboratorio,
      docurl,
      resultados,
      paciente_id,
      statusSistema,
    } = request.body;

    const ExameExistente = await Exame.findByPk(id);

    if (!ExameExistente) {
      return response.status(400).json({ message: "Exame não foi encontrado" });
    }

    const data = {
      nomeExame: nomeExame || ExameExistente.nomeExame,
      dataExame: dataExame || dataFormatada,
      horaExame: horaExame || dataHora,
      tipoExame: tipoExame || ExameExistente.tipoExame,
      laboratorio: laboratorio || ExameExistente.laboratorio,
      docurl: docurl || ExameExistente.docurl,
      resultados: resultados || ExameExistente.resultados,
      paciente_id,
      statusSistema: statusSistema || ExameExistente.statusSistema,
    };

    await Exame.update(data, { where: { exameId: id } });
    response.status(200).json({ message: "Exame atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
      error,
    });
  }
};

const buscarExames = async (request, response) => {
  try {
    const exames = await Exame.findAll();
    if (!exames)
      return response.status(400).json({ message: "Exame não encontrado" });
    response.status(200).json({ exames });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
      error,
    });
  }
};
const buscaExame = async (request, response) => {
  try {
    const paciente = await Paciente.findOne({
      where: { nome_completo: request.params.nome },
    });
    if (!paciente) {
      return response.status(404).send({ message: "Paciente não encontrado" });
    }
    const exame = await Exame.findAll({
      where: { paciente_id: paciente.id },
    });
    console.log(exame);
    if (!exame) {
      return response.status(400).send({ message: "Exame não encontrado" });
    }

    return response.status(200).send({ exame });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
      error,
    });
  }
};

const deleteExame = async (request, response) => {
  try {
    const exameId = await Exame.destroy({
      where: {
        exameId: request.params.id,
      },
    });

    if (!exameId)
      return response.status(400).json({ message: "ID não encontrado" });

    response.status(202).json();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
      error,
    });
  }
};

module.exports = {
  criarExame,
  atualizarExame,
  buscarExames,
  buscaExame,
  deleteExame,
};
