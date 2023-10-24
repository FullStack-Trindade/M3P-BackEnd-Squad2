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

const consultaRoutes = new Router();

consultaRoutes.post("/consultas", validacaoConsulta, criarConsulta);
consultaRoutes.put("/consultas/:id",validacaoUpdateConsulta, atualizarConsulta);
//consultaRoutes.get("/consultas", buscarConsultas);
consultaRoutes.get("/consultas/:id", buscaConsulta);
consultaRoutes.delete("/consultas/:id", deleteConsulta);

module.exports = consultaRoutes ;