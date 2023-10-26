const { Router } = require("express");
const validacaoExame = require('../middlewares/exames.middleware/exames.middleware')
const validacaoUpdate = require('../middlewares/exames.middleware/examesUpdate.middleware')
const {
  criarExame,
  atualizarExame,
  buscarExames,
  buscaExame,
  deleteExame
} = require("../controllers/exames/exames.controller");
const { validarToken } = require("../middlewares/validarToken");

const exameRoutes = new Router();

exameRoutes.post("/api/exames", validarToken, validacaoExame, criarExame);
exameRoutes.put("/api/exames/:id", validarToken, validacaoUpdate, atualizarExame);
exameRoutes.get("/api/exames", validarToken, buscarExames);
exameRoutes.get("/api/exames/:nome", validarToken, buscaExame);
exameRoutes.delete("/api/exames/:id", validarToken, deleteExame);

module.exports = { exameRoutes };