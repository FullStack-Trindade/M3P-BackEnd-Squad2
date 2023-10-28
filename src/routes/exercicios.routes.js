const express = require('express');
const { buscarExercicios, criarExercicio, buscaExercicioPorNome, atualizarExercicio, deletaExercicio } = require('../controllers/exercicios.controller');
const validaNovoExercicio = require ('../middlewares/exercicios/validaNovoExercicio.middleware')
const router = express.Router();

// Cadastra um novo exercício
router.post('/exercicios', validaNovoExercicio, criarExercicio)

// Atualiza exercício por ID
router.put('/exercicios/:id', atualizarExercicio)

// Lista exercícios por nome do paciente
router.get('/exercicios/:nome', buscaExercicioPorNome)

// lista todos os exercícios
router.get('/exercicios', buscarExercicios)

// Deleta um exercício por ID
router.delete('/exercicios/:id', deletaExercicio)


module.exports = router