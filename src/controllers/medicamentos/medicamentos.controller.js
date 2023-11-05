const Medicamento = require("../../models/medicamentos/medicamentos.model");
const Paciente = require("../../models/paciente");
const { criarLog } = require("../logs/log.controller");

const { dataHora, dataFormatada } = require("../../services/dataHora.service");

const criarMedicamento = async (request, response) => {
  try {
    const {
      nomeMedicamento,
      dataMedicamento,
      horaMedicamento,
      tipoMedicamento,
      quantidadeMedicamento,
      unidadeMedicamento,
      observacoesMedicamento,
      statusDoSistema,
      paciente_id,
    } = request.body;

    const paciente = await Paciente.findByPk(paciente_id);

    if (!paciente) {
      return response.status(400).json({ message: "Paciente nao encontrado" });
    }
    const medicamento = await Medicamento.create({
      nomeMedicamento,
      dataMedicamento,
      horaMedicamento,
      tipoMedicamento,
      quantidadeMedicamento,
      unidadeMedicamento,
      observacoesMedicamento,
      statusDoSistema,
      paciente_id,
    });
    console.error(medicamento);

    await criarLog(request,`Adicionou o medicamento ${medicamento.nomeMedicamento} para o paciente${paciente.nome_completo}`);

    response.status(201).json(medicamento);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Nao foi possivel processar a solicitação",
      error,
    });
  }
};

const atualizarMedicamento = async (request, response) => {
  try {
    const { id } = request.params;

    const {
      nomeMedicamento,
      dataMedicamento,
      horaMedicamento,
      tipoMedicamento,
      quantidadeMedicamento,
      unidadeMedicamento,
      observacoesMedicamento,
      statusDoSistema,
      paciente_id,
    } = request.body;

    const medicamentoExistente = await Medicamento.findByPk(id);
    console.log(medicamentoExistente);
    if (!medicamentoExistente) {
      return response
        .status(400)
        .json({ message: "Medicamento não encontrado" });
    }
    const data = {
      nomeMedicamento: nomeMedicamento || medicamentoExistente.nomeMedicamento,
      dataMedicamento: dataMedicamento || dataFormatada,
      horaMedicamento: horaMedicamento || dataHora,
      tipoMedicamento: tipoMedicamento || medicamentoExistente.tipoMedicamento,
      quantidadeMedicamento:
        quantidadeMedicamento || medicamentoExistente.quantidadeMedicamento,
      unidadeMedicamento:
        unidadeMedicamento || medicamentoExistente.unidadeMedicamento,
      observacoesMedicamento:
        observacoesMedicamento || medicamentoExistente.observacoesMedicamento,
      statusDoSistema: statusDoSistema || medicamentoExistente.statusDoSistema,
      paciente_id,
    };
    await Medicamento.update(data, { where: { id: id } });

    const paciente = await Paciente.findByPk(medicamentoExistente.paciente_id);
    await criarLog(
      request,
      `Atualizou o medicamento de ${medicamentoExistente.nomeMedicamento} do paciente ${paciente.nome_completo}`
    );

    response
      .status(200)
      .json({ message: "Medicamento atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Nao foi possivel processar a solicitação",
      error,
    });
  }
};

// const buscarMedicamentos  = async(request, response) =>{
//     try{
//         const medicamentos = await Medicamento.findAll();
//         if(!medicamentos)
//         return response.status(400).json({message: "Medicamento não encontrado"})
//         response.status(200).json({medicamentos})
//     }catch(error){
//         console.log(error)
//         return response.status(500).json({
//             message: "Não foi possivel processar a solicitacao",
//             error,
//         })
//     }
// }

const buscarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll();
    return res.status(200).json(medicamentos);
  } catch (error) {
    console.error("Erro ao listar medicamentos:", error);
    return res.status(500).json({ message: "Erro ao listar medicamentos", error });
  }
};

const buscarMedicamento = async (request, response) => {
  try {
    const paciente = await Paciente.findOne({
      where: { nome_completo: request.params.nome },
    });
    if (!paciente) {
      return response.status(404).send({ message: "Paciente nao encontrado" });
    }
    const medicamentos = await Medicamento.findAll({
      where: { paciente_id: paciente.id },
    });
    console.log(medicamentos);
    if (!medicamentos) {
      return response
        .status(400)
        .send({ message: "Medicamento nao encontrado" });
    }
    return response.status(200).send({ medicamentos });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Nao foi possivel realizar a solicitacao",
      error,
    });
  }
};

const deleteMedicamentos = async (request, response) => {
  try {
    const medicamentos = await Medicamento.findByPk(request.params.id);
    console.log(medicamentos);
    const id = await Medicamento.destroy({
      where: {
        id: request.params.id,
      },
    });
    if (!id) return response.status(400).json({ message: "id nao encontrado" });

    const paciente = await Paciente.findByPk(medicamentos.paciente_id);
    await criarLog(
      request,
      `Excluiu o medicamento de ${medicamentos.nomeMedicamento} do paciente ${paciente.nome_completo}`
    );

    response.status(202).json({ message: "Dados excluidos com sucesso!" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Nao e possivel processar a solicitacao", error });
  
    }
};
module.exports = {
    criarMedicamento,
    atualizarMedicamento,
    buscarMedicamentos,
    buscarMedicamento,
    deleteMedicamentos
}
