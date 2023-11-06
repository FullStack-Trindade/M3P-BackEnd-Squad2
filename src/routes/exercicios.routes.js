const express = require('express');
const { buscarExercicios, criarExercicio, buscaExercicioPorNome, atualizarExercicio, deletaExercicio } = require('../controllers/exercicios.controller');
const validaNovoExercicio = require ('../middlewares/exercicios/validaNovoExercicio.middleware')
const { validarToken } = require("../middlewares/validarToken");
const router = express.Router();

// Cadastra um novo exercício
router.post('/exercicios',validarToken, validaNovoExercicio, criarExercicio)

// Atualiza exercício por ID
router.put('/exercicios/:id',validarToken, atualizarExercicio)

// Lista exercícios por nome do paciente
router.get('/exercicios/:nome',validarToken, buscaExercicioPorNome)

// lista todos os exercícios
router.get('/exercicios',validarToken, buscarExercicios)

// Deleta um exercício por ID
router.delete('/exercicios/:id',validarToken, deletaExercicio)


module.exports = router