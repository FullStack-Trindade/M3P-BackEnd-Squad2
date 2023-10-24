const { Router } = require("express");
const validarNovaDieta = require('../middlewares/validarNovaDieta')
const validarAtualizacaoDieta = require('../middlewares/validarAtualizacaoDieta')
const {
  cadastraDieta,
  atualizaDieta,
  listaDietas,
  excluiDieta,
  listaDietasPorPaciente,
} = require("../controllers/dietas/dietas.controller");

const dietaRoutes = new Router();


dietaRoutes.post("/dietas", validarNovaDieta, cadastraDieta);
dietaRoutes.put("/dietas/:id", validarAtualizacaoDieta, atualizaDieta);
dietaRoutes.get("/dietas", listaDietas);
dietaRoutes.get("/dietas/:nomePaciente", listaDietasPorPaciente);
dietaRoutes.delete("/dietas/:id", excluiDieta);

module.exports = { dietaRoutes };