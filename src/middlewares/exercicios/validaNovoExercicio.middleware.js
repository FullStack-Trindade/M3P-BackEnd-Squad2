const yup = require("yup")

const schema = yup.object().shape({
	nome_serie: yup
		.string()
		.required("Nome da série é obrigatório")
		.min(5, "O nome da série deve ter no mínimo 5 caracteres")
		.max(100, "O nome da série deve ter no máximo 100 caracteres"),

	data_exercicio: yup
		.date()
		.required("A data é obrigatória")
		.max(new Date(), "Favor informar uma data válida"),

	hora_exercicio: yup.required("A hora é obrigatória"),
	// .max(),

	tipo_exercicio: yup
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

	qtd_por_semana: yup
		.number()
		.required("A quantidade por semana é obrigatória")
		.positive("A quantidade deve ser um número positivo")
		.matches(/[0-9]{2}\.[0-9]{2}/),

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