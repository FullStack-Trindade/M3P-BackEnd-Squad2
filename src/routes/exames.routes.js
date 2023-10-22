const { Router } = require("express");
const validacaoExame = require('../middlewares/exames.middleware/exames.middleware')
const validacaoUpdate = require('../middlewares/exames.middleware/examesUpdate.middleware')
const {
  criarExame,
  atualizarExame,
  buscarExames,
  buscaExame,
  deleteExame
} = require("../controllers/exames.controller");

const exameRoutes = new Router();

exameRoutes.post("/api/exames", validacaoExame, criarExame);
exameRoutes.put("/api/exames/:id", validacaoUpdate, atualizarExame);
exameRoutes.get("/api/exames", buscarExames);
exameRoutes.get("/api/exames/:nomeExame", buscaExame);
exameRoutes.delete("/api/exames/:id", deleteExame);

module.exports = { exameRoutes };