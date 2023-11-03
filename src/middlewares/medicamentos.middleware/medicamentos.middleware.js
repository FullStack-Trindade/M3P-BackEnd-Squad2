const yup = require("yup");

const schema = yup.object().shape({
  NomeMedicamento: yup
    .string()
    .min(5, "O nome do medicamento deve ter pelo menos 5 caracteres")
    .max(100, "O nome do medicamento não pode ter mais de 100 caracteres")
    .required("O nome do medicamento é obrigatório"),
  Data: yup
    .date()
    .default(() => new Date())
    .required("A data é obrigatória"),
  Horario: yup.string().required("O horário é obrigatório"),
  Tipo: yup
    .string()
    .oneOf(
      [
        "Cápsula",
        "Comprimido",
        "Líquido",
        "Creme",
        "Gel",
        "Inalação",
        "Injeção",
        "Spray",
      ],
      "Tipo inválido"
    )
    .required("O tipo é obrigatório"),
  Quantidade: yup
    .number()
    .typeError("A quantidade deve ser um número")
    .required("A quantidade é obrigatória")
    .min(0.01, "A quantidade deve ser pelo menos 0,01")
    .moreThan(0.01, "A quantidade deve ser maior do que 0,01")
    .test(
      "decimal-places",
      "A quantidade deve ter pelo menos duas casas decimais",
      (value) => (value + "").split(".")[1]?.length >= 2
    ),
  Unidade: yup
    .string()
    .oneOf(["mg", "mcg", "g", "mL", "%"], "Unidade inválida")
    .required("A unidade é obrigatória"),
  Observacoes: yup
    .string()
    .min(10, "As observações devem ter pelo menos 10 caracteres")
    .max(1000, "As observações não podem ter mais de 1000 caracteres")
    .required("As observações são obrigatórias"),
  StatusSistema: yup.boolean().required("O estado do sistema é obrigatório"),
});

const data = {
    NomeMedicamento: 'Ibuprofeno',
    Data: new Date(),
    Horario: '08:00 AM',
    Tipo: 'Comprimido',
    Quantidade: 10.25,
    Unidade: 'mg',
    Observacoes: 'Tomar com comida.',
    StatusSistema: true,
  };
  
const validacoesMedicamentos = (request, response, next)
try{
    schema.validateSync(request.body);
    next();
}catch(error){
    response.status(400).json({message: error.message})
}

module.exports = validacoesMedicamentos;