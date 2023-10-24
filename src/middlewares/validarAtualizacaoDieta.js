const yup = require("yup");

const data = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const schema = yup.object().shape({
  nomeDieta: yup
    .string()
    .required("Nome do dieta é obrigatório")
    .min(5, "Nome do dieta precisa ter, no mínimo, 5 caracteres")
    .max(100, "Nome do dieta precisa ter, no máximo, 100 caracteres"),
  dataDieta: yup.date().default(new Date()),
  horaDieta: yup.string().default(data),
  tipoDieta: yup
    .string()
    .required('Tipo é obrigatório')
    .oneOf(['Low Carb', 'Dash', 'Paleolítica', 'Cetogênica', 'Dukan', 'Mediterrânea', 'Outra'], 'Gênero deve ser Low Carb, Dash, Paleolítica, Cetogênica, Dukan, Mediterrânea, Outra'),
  descricaoDieta: yup.string(),
  statusSistema: yup.boolean().oneOf([true]),
});

const validarAtualizacaoDieta = (req, res, next) => {
  try {
    schema.validateSync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validarAtualizacaoDieta;
