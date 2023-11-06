const { Router } = require("express");
const validacaoExame = require('../middlewares/exames.middleware/exames.middleware')
const validacaoUpdate = require('../middlewares/exames.middleware/examesUpdate.middleware')
const {
  criarExame,
  atualizarExame,
  buscarExames,
  buscaExame,
  buscaExameId,
  deleteExame
} = require("../controllers/exames/exames.controller");
const { validarToken } = require("../middlewares/validarToken");

const exameRoutes = new Router();

exameRoutes.post("/exames", validarToken, validacaoExame, criarExame);
exameRoutes.put("/exames/:id", validarToken, validacaoUpdate, atualizarExame);
exameRoutes.get("/exames", validarToken, buscarExames);
exameRoutes.get("/exames/:nome", validarToken, buscaExame);
exameRoutes.get("/exames/:id", validarToken, buscaExameId);
exameRoutes.delete("/exames/:id", validarToken, deleteExame);

module.exports = { exameRoutes };


