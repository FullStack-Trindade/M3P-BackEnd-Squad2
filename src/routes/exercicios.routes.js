const express = require('express');
const router = express.Router();

// Cadastra um novo exercício
router.post('/api/exercicios')

// Atualiza exercício por ID
router.put('/api/exercicios/:id')

// Lista exercícios por nome do paciente || lista todos os exercícios
router.get('/api/exercicios')

// Deleta um exercício por ID
router.delete('/api/exercicios/:id')


module.exports = router