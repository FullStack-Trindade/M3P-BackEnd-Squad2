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

consultaRoutes.post("/api/consultas", validacaoConsulta, criarConsulta);
consultaRoutes.put("/api/consultas/:id", atualizarConsulta);
//consultaRoutes.get("/api/consultas", buscarConsultas);
consultaRoutes.get("/api/consultas/:id", buscaConsulta);
consultaRoutes.delete("/api/consultas/:id", deleteConsulta);

module.exports = consultaRoutes ;