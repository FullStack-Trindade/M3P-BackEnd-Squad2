const yup = require("yup");
const moment = require("moment");


const schema = yup.object().shape({
  nome_dieta: yup
    .string()
    .required('Nome da Dieta é obrigatório')
    .min(5, 'Nome da Dieta deve ter pelo menos 5 caracteres')
    .max(100, 'Nome da Dieta deve ter no máximo 100 caracteres'), 
    data: yup.date().nullable().test('date-format', 'Data deve estar no formato YYYY-MM-DD', (value) => !value || moment(value, 'YYYY-MM-DD', true).isValid()),
    horario: yup.string().nullable().test('time-format', 'Horário deve estar no formato HH:MM:SS', (value) => !value || moment(value, 'HH:mm:ss', true).isValid()),  
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

const validarNovaDieta = (req, res, next) => {
  try {
    schema.validateSync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validarNovaDieta;