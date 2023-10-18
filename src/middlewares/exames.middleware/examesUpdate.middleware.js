const yup = require("yup");

const data = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const schema = yup.object().shape({
  nomeExame: yup
    .string()
    .min(8, "Nome do exame precisa ter, no mínimo, 8 caracteres")
    .max(64, "Nome do exame precisa ter, no máximo, 64 caracteres"),
    dataExame: yup.date().default(new Date()),
  horaExame: yup.string().default(data),
  tipoExame: yup
    .string()
    .min(4, "Tipo de exame precisa ter, no mínimo, 8 caracteres")
    .max(32, "Tipo de exame precisa ter, no máximo, 64 caracteres"),
  laboratorio: yup
    .string()
    .min(4, "Laboratório precisa ter, no mínimo, 8 caracteres")
    .max(32, "Laboratório precisa ter, no máximo, 64 caracteres"),
  resultados: yup
    .string()
    .min(16, "Resultados precisam ter, no mínimo, 16 caracteres")
    .max(1024, "Resultados precisam ter, no máximo, 1024 caracteres"),
  statusSistema: yup.boolean().oneOf([true]),
});

const validacoesExame = (req, res, next) => {
  try {
    schema.validateSync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validacoesExame;
