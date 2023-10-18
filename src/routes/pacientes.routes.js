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

// Rota para cadastrar um novo paciente
router.post('/pacientes', validarNovoPaciente, cadastraPaciente);

// Rota para atualizar um paciente por ID
router.put('/pacientes/:id', atualizaPaciente);

// Rota para listar todos os pacientes
router.get('/pacientes', listaPacientes);

// Rota para consultar um paciente por ID
router.get('/pacientes/:id', consultaPacientePorId);

// Rota para excluir um paciente por ID
router.delete('/pacientes/:id', excluiPaciente);

module.exports = router;