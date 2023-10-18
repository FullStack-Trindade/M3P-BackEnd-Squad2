const { Router } = require("express");
const {
  criarUsuario,
  atualizarUsuario,
  buscarUsuarios,
  deletarUsuario,
  loginUsuario,
} = require("../controllers/usuarios/usuarios.controller");
const { validarNovoUsuario } = require("../middlewares/validarNovoUsuario");
const {
  validarAtualizarUsuario,
} = require("../middlewares/validarAtualizarUsuario");
const { validarToken } = require("../middlewares/validarToken");

const usuarioRoutes = new Router();

usuarioRoutes.post("/usuarios", validarToken, validarNovoUsuario, criarUsuario);
usuarioRoutes.put(
  "/usuarios/:id",
  validarToken,
  validarAtualizarUsuario,
  atualizarUsuario
);
usuarioRoutes.get("/usuarios", validarToken, buscarUsuarios);
usuarioRoutes.delete("/usuarios/:id", validarToken, deletarUsuario);
usuarioRoutes.post("/usuarios/login", loginUsuario);

module.exports = { usuarioRoutes };
