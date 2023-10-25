const { Router } = require('express');
const { listarLogs } = require('../controllers/logs/log.controller');

const logRoutes = new Router();

logRoutes.get('/logs', listarLogs);

module.exports = { logRoutes };