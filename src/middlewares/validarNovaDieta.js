const yup = require("yup");


const schema = yup.object().shape({
  nome_dieta: yup
    .string()
    .required('Nome da Dieta é obrigatório')
    .min(5, 'Nome da Dieta deve ter pelo menos 5 caracteres')
    .max(100, 'Nome da Dieta deve ter no máximo 100 caracteres'),
  data: yup.date().required('Data é obrigatória'),
  horario: yup.string().required('Horário é obrigatório'),
  tipo: yup
    .string()
    .required('Tipo é obrigatório')
    .oneOf(
      ['Low Carb', 'Dash', 'Paleolítica', 'Cetogênica', 'Dukan', 'Mediterrânea', 'Outra'],
      'Tipo inválido'
    ),
  descricao: yup.string().required('Descrição é obrigatória'),
  status_sistema: yup.boolean().required('Status do Sistema é obrigatório'),
  paciente_id: yup.number().required('ID do Paciente é obrigatório'),
});

const validarNovaDieta = (request, response, next) => {
  try {
    schema.validateSync(request.body);
    next();
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

module.exports = validarNovaDieta;