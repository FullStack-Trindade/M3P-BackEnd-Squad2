const { Router } = require("express");
const validacaoConsulta = require('../middlewares/consultas.middleware/consultas.middleware')
const validacaoUpdateConsulta = require('../middlewares/consultas.middleware/validacaoUpdateConsulta.middleware')

const {
    criarConsulta,
    atualizarConsulta,
    buscarConsultas,
    buscaConsulta,
    deleteConsulta,
} = require("../controllers/consultas/consultas.controller");
const { validarToken } = require("../middlewares/validarToken");

const consultaRoutes = new Router();

consultaRoutes.post("/consultas", validarToken,  validacaoConsulta, criarConsulta);
consultaRoutes.put("/consultas/:id", validarToken, validacaoUpdateConsulta, atualizarConsulta);
consultaRoutes.get("/consultas", validarToken, buscarConsultas);
consultaRoutes.get("/consultas/:id", validarToken, buscaConsulta);
consultaRoutes.delete("/consultas/:id", validarToken, deleteConsulta);

module.exports = consultaRoutes ;