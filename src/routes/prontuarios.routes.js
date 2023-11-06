const { Router } = require("express");
const {
  buscarProntuarios,
  buscarProntuarioId,
} = require("../controllers/prontuarios/prontuarios.controller");
const { validarToken } = require("../middlewares/validarToken");

const prontuariosRoutes = new Router();

prontuariosRoutes.get("/prontuarios", validarToken, buscarProntuarios);
prontuariosRoutes.get("/prontuarios/:id", validarToken, buscarProntuarioId);

module.exports = { prontuariosRoutes }