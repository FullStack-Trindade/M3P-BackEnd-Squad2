const { Router } = require("express");
const {
  criarUsuario,
  atualizarUsuario,
  buscarUsuarios,
  deletarUsuario,
} = require("../controllers/usuarios/usuarios.controller");
const { validarNovoUsuario } = require("../middlewares/validarNovoUsuario");
const {
  validarAtualizarUsuario,
} = require("../middlewares/validarAtualizarUsuario");

const usuarioRoutes = new Router();

usuarioRoutes.post("/usuarios", validarNovoUsuario, criarUsuario);
usuarioRoutes.put("/usuarios/:id", validarAtualizarUsuario, atualizarUsuario);
usuarioRoutes.get("/usuarios", buscarUsuarios);
usuarioRoutes.delete("/usuarios/:id", deletarUsuario);

module.exports = { usuarioRoutes };
