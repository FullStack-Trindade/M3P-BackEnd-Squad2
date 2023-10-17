const express = require('express');
const router = express.Router();

const { cadastraPaciente } = require('../controllers/pacientes/pacientes.controller');

// Rota para cadastrar um novo paciente
router.post('/pacientes', cadastraPaciente);


module.exports = router;