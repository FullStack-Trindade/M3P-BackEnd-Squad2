const { Router } = require("express");
const {
  criarUsuario,
  atualizarUsuario,
  buscarUsuarios,
} = require("../controllers/usuarios/usuarios.controller");

const usuarioRoutes = new Router();

usuarioRoutes.post("/usuarios", criarUsuario);
usuarioRoutes.put("/usuarios/:id", atualizarUsuario);
usuarioRoutes.get("/usuarios", buscarUsuarios);

module.exports = { usuarioRoutes };
