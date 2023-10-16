const { Router } = require("express");
const { criarUsuario } = require("../controllers/usuarios/criarUsuario");

const usuarioRoutes = new Router();

usuarioRoutes.post("/api/usuarios", criarUsuario);
