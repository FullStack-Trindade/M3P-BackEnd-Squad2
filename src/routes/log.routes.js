const { Router } = require('express');
const { listarLogs } = require('../controllers/logs/log.controller');
const { validarToken } = require("../middlewares/validarToken");

const logRoutes = new Router();

logRoutes.get('/logs', validarToken, listarLogs);

module.exports = { logRoutes };