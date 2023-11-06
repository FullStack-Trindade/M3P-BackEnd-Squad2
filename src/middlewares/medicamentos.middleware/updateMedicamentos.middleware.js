const yup = require("yup");

const medicamentoSchema = yup.object().shape({
  nomeMedicamento: yup.string().min(5).max(100),
  dataMedicamento: yup.date(),
  horaMedicamento: yup.string(),
  tipoMedicamento: yup
    .string()
    .oneOf(
      [
        "CAPSULA",
        "COMPRIMIDO",
        "LIQUIDO",
        "CREME",
        "GEL",
        "INALACAO",
        "INJECAO",
        "SPRAY",
      ],
      "Tipo inválido"
    ),
    quantidadeMedicamento: yup
    .number()
    .typeError("A quantidade deve ser um número")
    .min(0.01, "A quantidade deve ser pelo menos 0,01")
    .moreThan(0.01, "A quantidade deve ser maior do que 0,01")
    .test(
      'A quantidade deve ter pelo menos duas casas decimais',
      (value) => {
        if (!value) return true;
        const decimalPart = (value % 1).toFixed(2).split('.')[1];
        return decimalPart && decimalPart.length >= 2;
      }
    ),
  unidadeMedicamento: yup
    .string()
    .oneOf(["mg", "mcg", "g", "mL", "%"]),
  observacoesMedicamento: yup.string().min(10).max(1000).required(),
  statusDoSistema: yup.boolean().default(true),
});

const validacoesUpdateMedicamentos = (request, response, next) => {
  try {
    medicamentoSchema.validateSync(request.body);
    next();
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

module.exports = validacoesUpdateMedicamentos;
