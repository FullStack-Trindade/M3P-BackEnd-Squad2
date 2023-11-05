const { Router } = require("express");
const validarNovaDieta = require('../middlewares/validarNovaDieta')
const validarAtualizacaoDieta = require('../middlewares/validarAtualizacaoDieta')
const {
  cadastraDieta,
  atualizaDieta,
  listaDietas,
  excluiDieta,
  listaDietasPorPaciente,
  buscaDietaPorId,
} = require("../controllers/dietas/dietas.controller");
const { validarToken } = require("../middlewares/validarToken");

const dietaRoutes = new Router();


dietaRoutes.post("/dietas", validarToken, validarNovaDieta, cadastraDieta);
dietaRoutes.put("/dietas/:id",  validarToken, validarAtualizacaoDieta, atualizaDieta);
dietaRoutes.get("/dietas",  validarToken, listaDietas);
dietaRoutes.get("/dietas/:id",  validarToken, buscaDietaPorId);
dietaRoutes.get("/dietas/:nomePaciente",  validarToken,listaDietasPorPaciente);
dietaRoutes.delete("/dietas/:id",validarToken, excluiDieta);

module.exports = { dietaRoutes };