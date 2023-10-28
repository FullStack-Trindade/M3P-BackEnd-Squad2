const express = require("express");
const router = express.Router();

const validacaoMedicamentos = require("../middlewares/medicamentos.middleware/medicamentos.middleware");
const validacaoUpdateMedicamentos = require("../middlewares/medicamentos.middleware/updateMedicamentos.middleware");

const {
  criarMedicamento,
  atualizarMedicamento,
  buscarMedicamentos,
  buscarMedicamento,
  deleteMedicamentos,
} = require("../controllers/medicamentos/medicamentos.controller");

const { validarToken } = require("../middlewares/validarToken");

const medicamentosRoutes = new Router();

medicamentosRoutes.post(
  "/medicamentos",
  validarToken,
  validacaoMedicamentos,
  criarMedicamento
);
medicamentosRoutes.put(
  "/medicamentos/:id".validarToken,
  validacaoUpdateMedicamentos,
  atualizarMedicamento
);
medicamentosRoutes.get("/medicamentos", validarToken, buscarMedicamentos);
medicamentosRoutes.get(
  "/medicamentos/:nomePaciente",
  validarToken,
  buscarMedicamento
);
medicamentosRoutes.delete(
  "/medicamentos/:id",
  validarToken,
  deleteMedicamentos
);

module.exports = { medicamentosRoutes };
