const yup = require("yup");


const schema = yup.object().shape({
  nome_dieta: yup
  .string()
  .required('Nome da Dieta é obrigatório')
  .min(5, 'Nome da Dieta deve ter pelo menos 5 caracteres')
  .max(100, 'Nome da Dieta deve ter no máximo 100 caracteres'),
  data: yup.date().required('Data é obrigatória no formato YYYY-MM-DD'),
  horario: yup.string().required('Horário é obrigatório no formato HH:MM:SS'),
  tipo: yup
  .string()
  .required('Tipo é obrigatório')
  .oneOf(
    ['Low Carb', 'Dash', 'Paleolítica', 'Cetogênica', 'Dukan', 'Mediterrânea', 'Outra'],
    'Tipo inválido: dever ser do tipo Low Carb, Dash, Paleolítica, Cetogênica, Dukan, Mediterrânea ou Outra'
  ),
  descricao: yup.string().required('Descrição é obrigatória'),
  status_sistema: yup.boolean().required('Status do Sistema é obrigatório'),
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
