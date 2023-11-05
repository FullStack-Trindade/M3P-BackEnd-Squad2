const Exame = require("../../models/exames/exames.model");
const Paciente = require("../../models/paciente");
const { criarLog } = require('../logs/log.controller');

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

    await criarLog(request, `criou um exame de ${ exame.nomeExame } para o paciente ${paciente.nome_completo}`);

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

    await Exame.update(data, { where: { id: id } });

    const paciente = await Paciente.findByPk(ExameExistente.paciente_id);
    await criarLog(request, `atualizou o exame de ${ ExameExistente.nomeExame } do paciente ${paciente.nome_completo} `);

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
    response.status(200).json( exames );
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

    return response.status(200).send( exame );
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
    const exame = await Exame.findByPk(request.params.id);
    const id = await Exame.destroy({
      where: {
        id: request.params.id,
      },
    });

    if (!id)
      return response.status(400).json({ message: "ID não encontrado" });

  const paciente = await Paciente.findByPk(exame.paciente_id);
  await criarLog(request, `excluiu o exame de ${ exame.nomeExame } do paciente ${paciente.nome_completo}`);

    response.status(202).json({ message: "Dados excluídos com sucesso" });
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
