const yup = require("yup");

const medicamentoSchema = yup.object().shape({
    NomeMedicamento: yup
      .string()
      .min(5)
      .max(100)
      .required(),
    Data: yup.date().required(),
    Horario: yup.string().required(),
    Tipo: yup
      .string()
      .oneOf(['Cápsula', 'Comprimido', 'Líquido', 'Creme', 'Gel', 'Inalação', 'Injeção', 'Spray'])
      .required(),
    Quantidade: yup
      .number()
      .typeError('A quantidade deve ser um número')
      .required()
      .min(0.01)
      .test(
        'decimal-places',
        'A quantidade deve ter pelo menos duas casas decimais',
        value => (value + '').split('.')[1]?.length >= 2
      ),
    Unidade: yup
      .string()
      .oneOf(['mg', 'mcg', 'g', 'mL', '%'])
      .required(),
    Observacoes: yup
      .string()
      .min(10)
      .max(1000)
      .required(),
    StatusSistema: yup.boolean().required(),
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