const Exercicio = require("../models/exercicios.model")
const Paciente = require("../models/paciente")

const { dataHora, dataFormatada } = require("../services/dataHora.service");


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
		
		const paciente = await Paciente.findOne({
			where: { nome_completo: req.params.nome}
		})

		// Verifica se o paciente existe
		if(!paciente) return res.status(404).json({message: "Paciente não encontrado"})

		const exercicio = await Exercicio.create({
			nomeSerie,
			dataExercicio: dataExercicio || dataFormatada,
			horaExercicio: horaExercicio || dataHora,
			tipoExercicio,
			qtdPorSemana,
			descricao,
			statusSistema: statusSistema || true,
			pacienteId: paciente_id
		})

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
		} = req.body

		const ExercicioExiste = await Exercicio.findByPk(id)

		if (!ExercicioExiste)
			return res.status(400).json({ message: "Exercício não encontrado" })

		const data = {
			nomeSerie: nomeSerie || ExercicioExiste.nomeSerie,
			dataExercicio: dataExercicio || new Date(),
			horaExercicio: horaExercicio || dataHora,
			tipoExercicio: tipoExercicio || ExercicioExiste.tipoExercicio,
			qtdPorSemana: qtdPorSemana || ExercicioExiste.qtdPorSemana,
			descricao: descricao || ExercicioExiste.descricao,
			statusSistema: statusSistema || ExercicioExiste.statusSistema,
		}

		await Exercicio.update(data, { where: { exercicioId: id } })
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
		const exercicios = await Exercicio.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt", "created_at", "updated_at"],
			},
			include: [
				{
					model: Paciente,
					exclude: ["createdAt", "updatedAt", "created_at", "updated_at"],
				}
			]
		})
		if (!exercicios)
			return res.status(400).json({ messagem: "Exame não encontrado" })

		res.status(200).json({ exercicios })
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			message: "Não foi possível processar a solicitação",
		})
	}
}

const buscaExercicioPorNome = async (req, res) => {
	try {
		const { paciente } = req.body
		const pacienteData = await Exercicio.findAll({
			where: { paciente: paciente },
		})

		if (pacienteData) return res.status(200).json({ pacienteData })

		const allData = await Exercicio.findAll()
		return res.status(200).json({ allData })
	} catch (error) {
		console.error(error)
		return response.status(500).json({
			message: "Não foi possível processar a solicitação",
		})
	}
}

const deletaExercicio = async (req, res) => {
	try {
		const id = await Exercicio.destroy({
			where: {
				id: req.params.id,
			},
		})

		if (!id) return res.status(400).json({ message: "ID não encontrado" })

		res.status(202).json()
	} catch (error) {
		console.error(error)
		return response.status(500).json({
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
