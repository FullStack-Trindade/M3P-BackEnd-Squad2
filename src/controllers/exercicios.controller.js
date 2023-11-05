const Exercicio = require("../models/exercicios.model")
const Paciente = require("../models/paciente")
const { criarLog } = require('./logs/log.controller');

const { dataHora, dataFormatada } = require("../services/dataHora.service")

// Cria um novo exercício
const criarExercicio = async (req, res) => {
	try {
		const {
			nomeSerie,
			dataExercicio,
			horaExercicio,
			tipoExercicio,
			qtdPorSemana,
			descricao,
			statusSistema,
			paciente_id,
		} = req.body

		console.log("Paciente ID: ", paciente_id)
		const paciente = await Paciente.findByPk(paciente_id)

		// Verifica se o paciente existe
		if (!paciente)
			return res.status(404).json({ message: "Paciente não encontrado" })

		const exercicio = await Exercicio.create({
			nomeSerie,
			dataExercicio,
			horaExercicio,
			tipoExercicio,
			qtdPorSemana,
			descricao,
			statusSistema,
			paciente_id,
		})

		await criarLog(req, `criou um exercício de ${ exercicio.nomeSerie } para o paciente ${paciente.nome_completo}`);

		return res.status(201).json(exercicio)
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			message: "Não foi possível processar a solicitação",
		})
	}
}

const atualizarExercicio = async (req, res) => {
	try {
		const { id } = req.params

		const {
			nomeSerie,
			dataExercicio,
			horaExercicio,
			tipoExercicio,
			qtdPorSemana,
			descricao,
			statusSistema,
			paciente_id,
		} = req.body

		const ExercicioExiste = await Exercicio.findByPk(id)

		if (!ExercicioExiste)
			return res.status(404).json({ message: "Exercício não encontrado" })

		const data = {
			nomeSerie: nomeSerie || ExercicioExiste.nomeSerie,
			dataExercicio: dataExercicio || new Date(),
			horaExercicio: horaExercicio || dataHora,
			tipoExercicio: tipoExercicio || ExercicioExiste.tipoExercicio,
			qtdPorSemana: qtdPorSemana || ExercicioExiste.qtdPorSemana,
			descricao: descricao || ExercicioExiste.descricao,
			statusSistema: statusSistema || ExercicioExiste.statusSistema,
			paciente_id,
		}

		await Exercicio.update(data, { where: { id: id } })

		const paciente = await Paciente.findByPk(ExercicioExiste.paciente_id);
		await criarLog(req, `atualizou o exercício de ${ ExercicioExiste.nomeSerie } do paciente ${paciente.nome_completo} `);
		res.status(200).json({ message: "Exercício atualizado com sucesso" })
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			message: "Não foi possível processar a solicitação",
		})
	}
}

// Busca todos os exercícios
const buscarExercicios = async (req, res) => {
	try {
		const exercicios = await Exercicio.findAll()
		if (!exercicios)
			return res.status(400).json({ messagem: "Exercício não encontrado" })
		res.status(200).json({ exercicios })
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			message: "Não foi possível processar a solicitação",
			error,
		})
	}
}

const buscaExercicioPorNome = async (req, res) => {
	try {
		const paciente = await Paciente.findOne({
			where: { nome_completo: req.params.nome },
		})
		if (!paciente) {
			return res.status(404).send({ message: "Paciente não encontrado" })
		}
		const exercicio = await Exercicio.findAll({
			where: { paciente_id: paciente.id },
		})

		if (!exercicio)
			return res.status(400).send({ message: "Exercício não encontrado" })

		return res.status(200).send( exercicio )
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			message: "Não foi possível processar a solicitação",
			error,
		})
	}
}

const deletaExercicio = async (req, res) => {
	try {
		const exercicio= await Exercicio.findByPk(req.params.id);
		const id = await Exercicio.destroy({
			where: {
				id: req.params.id,
			},
		})

		if (!id) return res.status(404).json({ message: "ID não encontrado" })

		const paciente = await Paciente.findByPk(exercicio.paciente_id);
		await criarLog(req, `excluiu o exercício de ${ exercicio.nomeSerie } do paciente ${paciente.nome_completo}`);

		res.status(202).json({ message: "Dados excluídos com sucesso" })
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			message: "Não foi possível processar a solicitação",
		})
	}
}

module.exports = {
	criarExercicio,
	atualizarExercicio,
	buscarExercicios,
	buscaExercicioPorNome,
	deletaExercicio,
}
