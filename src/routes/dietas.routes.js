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


dietaRoutes.post("/api/dietas", validarNovaDieta, cadastraDieta);
dietaRoutes.put("/api/dietas/:id", validarAtualizacaoDieta, atualizaDieta);
dietaRoutes.get("/api/dietas", listaDietas);
dietaRoutes.get("/api/dietas/:nomePaciente", listaDietasPorPaciente);
dietaRoutes.delete("/api/dietas/:id", excluiDieta);

module.exports = { dietaRoutes };