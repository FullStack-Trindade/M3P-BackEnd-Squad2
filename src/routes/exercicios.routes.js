const express = require('express');
const { buscarExercicios, criarExercicio } = require('../controllers/exercicios.controller');
const router = express.Router();

// Cadastra um novo exercício
router.post('/exercicios', criarExercicio)

// Atualiza exercício por ID
router.put('/exercicios/:id')

// Lista exercícios por nome do paciente || lista todos os exercícios
router.get('/exercicios', buscarExercicios)

// Deleta um exercício por ID
router.delete('/exercicios/:id')


module.exports = router