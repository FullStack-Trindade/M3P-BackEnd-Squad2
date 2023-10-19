const yup = require("yup");

const schema = yup.object().shape({
  motivoConsulta: yup
    .string()
    .min(8, "'Motivo da consulta' precisa ter, no mínimo, 8 caracteres")
    .max(64, "'Motivo da consulta' precisa ter, no máximo, 64 caracteres"),
  dataConsulta: yup.date(),
  horaConsulta: yup.string(),
  descricaoProblema: yup
    .string()
    .min(16, "Descrição do problema precisam ter, no mínimo, 16 caracteres")
    .max(1024, "Descrição do problema precisam ter, no máximo, 1024 caracteres"),
  medicacao: yup
    .string()
    .min(4, "'A medicação receitada' precisa ter, no mínimo, 4 caracteres")
    .max(32, "'A medicação receitada' precisa ter, no máximo, 32 caracteres"),
  dosagem: yup
    .string()
    .min(16, "Dosagem e Precauções precisa ter, no mínimo, 16 caracteres")
    .max(256, "Dosagem e Precauções precisa ter, no máximo, 256 caracteres"),

  statusSistema: yup.boolean().oneOf([true]),
});

const validacoesUpdateConsulta = (request, response, next) => {
  try {
    schema.validateSync(request.body);
    next();
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

module.exports = validacoesUpdateConsulta;
