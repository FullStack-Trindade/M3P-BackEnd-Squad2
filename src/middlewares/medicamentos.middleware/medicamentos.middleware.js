const yup = require("yup");

const schema = yup.object().shape({
  nomeMedicamento: yup
    .string()
    .min(5, "O nome do medicamento deve ter pelo menos 5 caracteres")
    .max(100, "O nome do medicamento não pode ter mais de 100 caracteres")
    .required("O nome do medicamento é obrigatório"),
  dataMedicamento: yup
    .date()
    .default(() => new Date())
    .required("A data é obrigatória"),
  horaMedicamento: yup.string().required("O horário é obrigatório"),
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
    )
    .required("O tipo é obrigatório"),
    quantidadeMedicamento: yup
    .number()
    .typeError("A quantidade deve ser um número")
    .required("A quantidade é obrigatória")
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
    .oneOf(["mg", "mcg", "g", "mL", "%"], "Unidade inválida")
    .required("A unidade é obrigatória"),
  observacoesMedicamento: yup
    .string()
    .min(10, "As observações devem ter pelo menos 10 caracteres")
    .max(1000, "As observações não podem ter mais de 1000 caracteres")
    .required("As observações são obrigatórias"),
  statusDoSistema: yup.boolean().required("O estado do sistema é obrigatório"),
});

// const data = {
//     NomeMedicamento: 'Ibuprofeno',
//     Data: new Date(),
//     Horario: '08:00 AM',
//     Tipo: 'Comprimido',
//     Quantidade: 10.25,
//     Unidade: 'mg',
//     Observacoes: 'Tomar com comida.',
//     StatusSistema: true,
//   };

const validacoesMedicamentos = (request, response, next) => {
  try {
    schema.validateSync(request.body);
    next();
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

module.exports = validacoesMedicamentos;
