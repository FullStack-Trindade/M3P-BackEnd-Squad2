const  Exame  = require("../../models/exames/exames.model");
const Paciente = require("")

const hoje = new Date();
const hora = hoje.getHours();
const minutos = hoje.getMinutes();
const segs = hoje.getSeconds();
const dataHora = `${hora}:${minutos}:${segs}`;

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
      statusSistema,
    } = request.body;


    const exame = await Exame.create({
      nomeExame,
      dataExame: dataExame || new Date(),
      horaExame: horaExame || dataHora,
      tipoExame,
      laboratorio,
      docurl,
      resultados,
      statusSistema,
    });
    console.error(exame);
    response.status(201).json(exame);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
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
      statusSistema,
    } = request.body;

    const ExameExistente = await Exame.findByPk(id);

    if (!ExameExistente) {
      return response.status(400).json({ message: "Exame não foi encontrado" });
    }

    const data = {
      nomeExame: nomeExame || ExameExistente.nomeExame,
      dataExame: dataExame || new Date(),
      horaExame: horaExame || dataHora,
      tipoExame: tipoExame || ExameExistente.tipoExame,
      laboratorio: laboratorio || ExameExistente.laboratorio,
      docurl: docurl || ExameExistente.docurl,
      resultados: resultados || ExameExistente.resultados,
      statusSistema: statusSistema || ExameExistente.statusSistema,
    };

    await Exame.update(data, { where: { exameId: id } });
    response.status(200).json({ message: "Exame atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
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
    });
  }
};
const buscaExame = async (request, response) => {
  try {

    const exame = await Exame.findAll({ include: Paciente.nome_completo })

    if (!exame) {
      return res.status(400).send({ message: "Exame não encontrado" });
    }

    return res.status(200).send({ exame }); 
 
  
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
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