const yup = require("yup")

const schema = yup.object().shape({
	nomeSerie: yup
		.string()
		.required("Nome da série é obrigatório")
		.min(5, "O nome da série deve ter no mínimo 5 caracteres")
		.max(100, "O nome da série deve ter no máximo 100 caracteres"),

	dataExercicio: yup
		.date()
		.required("A data é obrigatória")
		.max(new Date(), "Favor informar uma data válida"),

	horaExercicio: yup.string().required("A hora é obrigatória"),
	// .max(),

	tipoExercicio: yup
		.string()
		.required("O tipo de exercício é obrigatório")
		.oneOf([
			"RESISTENCIA AEROBICA",
			"RESISTENCIA MUSCULAR",
			"FLEXIBILIDADE",
			"FORÇA",
			"AGILIDADE",
			"OUTRO",
		]),

	qtdPorSemana: yup
		.string()
		.matches(/^[0-9]{2}\.[0-9]{2}$/, "A quantidade deve estar no formato 00.00")
		.required("A quantidade por semana é obrigatória"),

	descricao: yup
		.string()
		.required("A descrição é obrigatória")
		.min(10, "A descrição deve ter no mínimo 10 caracteres")
		.max(1000, "A descrição deve conter no máximo 1000 caracteres"),

	statusSistema: yup
		.boolean()
		.required("O status é obrigatório")
		.default("ativo"),
})

const validarNovoExercicio = async (req, res, next) => {
	try {
		await schema.validate(req.body, { abortEarly: false })
		next()
	} catch (error) {
		const errors = error.inner.map((e) => ({
			field: e.path,
			message: e.message,
		}))
		return res.status(400).json({ errors })
	}
}

module.exports = validarNovoExercicio
