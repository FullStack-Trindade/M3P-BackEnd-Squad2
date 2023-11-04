const { Router } = require("express");
const {
  criarUsuario,
  atualizarUsuario,
  buscarUsuarios,
  buscarUsuarioId,
  deletarUsuario,
  loginUsuario,
  resetarSenha,
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
usuarioRoutes.get("/usuarios/:id", validarToken, buscarUsuarioId);
usuarioRoutes.delete("/usuarios/:id", validarToken, deletarUsuario);
usuarioRoutes.post("/usuarios/login", loginUsuario);
usuarioRoutes.patch("/usuarios/resetarsenha", resetarSenha);

module.exports = { usuarioRoutes };
