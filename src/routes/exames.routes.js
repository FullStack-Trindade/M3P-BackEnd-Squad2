const { Router } = require("express");
const validacaoExame = require('../middlewares/exames.middleware')
const {
  criarExame,
  atualizarExame,
  buscarExames,
  buscaExame,
  deleteExame
} = require("../controllers/exames.controller");

const exameRoutes = new Router();

exameRoutes.post("/api/exames",  criarExame);
exameRoutes.put("/api/exames/:id", validacaoExame, atualizarExame);
exameRoutes.get("/api/exames", buscarExames);
exameRoutes.get("/api/exames/:nomeExame", buscaExame);
exameRoutes.delete("/api/exames/:id", deleteExame);

module.exports = { exameRoutes };