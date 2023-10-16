const { Router } = require("express");
const {
  criarUsuario,
  atualizarUsuario,
  buscarUsuarios,
  deletarUsuario,
} = require("../controllers/usuarios/usuarios.controller");

const usuarioRoutes = new Router();

usuarioRoutes.post("/usuarios", criarUsuario);
usuarioRoutes.put("/usuarios/:id", atualizarUsuario);
usuarioRoutes.get("/usuarios", buscarUsuarios);
usuarioRoutes.delete("/usuarios/:id", deletarUsuario);

module.exports = { usuarioRoutes };
