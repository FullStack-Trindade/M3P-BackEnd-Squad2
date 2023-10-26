const express = require('express');
const router = express.Router();

const {
  cadastraPaciente,
  atualizaPaciente,
  listaPacientes,
  consultaPacientePorId,
  excluiPaciente
} = require('../controllers/pacientes/pacientes.controller');

const validarNovoPaciente = require('../middlewares/ValidarNovoPaciente');
const validarAtualizacaoPaciente = require('../middlewares/validarAtualizacaoPaciente');
const { validarToken } = require("../middlewares/validarToken");

// Rota para cadastrar um novo paciente
router.post('/pacientes', validarToken, validarNovoPaciente, cadastraPaciente);

// Rota para atualizar um paciente por ID
router.put('/pacientes/:id', validarToken, validarAtualizacaoPaciente, atualizaPaciente);

// Rota para listar todos os pacientes
router.get('/pacientes', validarToken, listaPacientes);

// Rota para consultar um paciente por ID
router.get('/pacientes/:id', validarToken, consultaPacientePorId);

// Rota para excluir um paciente por ID
router.delete('/pacientes/:id', validarToken, excluiPaciente);

module.exports = router;