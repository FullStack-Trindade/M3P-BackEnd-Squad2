const { Router } = require("express");
const {
  cadastrarConfiguracoes,
  atualizarConfiguracoes,
  buscarConfiguracoes,
  buscarConfiguracaoId,
  deletarConfiguracao,
  restaurarConfiguracao,
} = require("../controllers/configuracoes/configuracoes.controller");
const { validarToken } = require("../middlewares/validarToken");

const configuracaoRoutes = new Router();

configuracaoRoutes.post("/configuracoes", validarToken, cadastrarConfiguracoes);
configuracaoRoutes.put(
  "/configuracoes/:id",
  validarToken,
  atualizarConfiguracoes
);
configuracaoRoutes.get("/configuracoes", validarToken, buscarConfiguracoes);
configuracaoRoutes.get(
  "/configuracoes/:id",
  validarToken,
  buscarConfiguracaoId
);
configuracaoRoutes.delete(
  "/configuracoes/:id",
  validarToken,
  deletarConfiguracao
);
configuracaoRoutes.post(
  "/configuracoes/:id",
  validarToken,
  restaurarConfiguracao
);

module.exports = { configuracaoRoutes };
