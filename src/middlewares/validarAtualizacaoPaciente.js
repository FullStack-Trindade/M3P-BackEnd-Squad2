const yup = require('yup');

const schema = yup.object().shape({
  nome_completo: yup
    .string()
    .min(8, 'Nome Completo deve ter pelo menos 8 caracteres')
    .max(64, 'Nome Completo deve ter no máximo 64 caracteres'),

  genero: yup.string().oneOf(['MASCULINO', 'FEMININO', 'OUTRO']),

  data_nascimento: yup.date().max(new Date(), 'Data de Nascimento deve ser uma data válida'),

  estado_civil: yup.string().oneOf(['SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO']),

  telefone: yup.string().matches(/\(\d{2}\) \d \d{4}-\d{4}/, 'Telefone deve estar no formato (99) 9 9999-9999'),

  email: yup.string().email('E-mail deve ser válido'),

  naturalidade: yup
    .string()
    .min(8, 'Naturalidade deve ter pelo menos 8 caracteres')
    .max(64, 'Naturalidade deve ter no máximo 64 caracteres'),

  contato_emergencia: yup.string().matches(/\(\d{2}\) \d \d{4}-\d{4}/, 'Contato de Emergência deve estar no formato (99) 9 9999-9999'),

  endereco: yup.object().shape({
    cep: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
    logradouro: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
  }),

  status: yup.boolean(),
});

const validarAtualizacaoPaciente = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((e) => ({ field: e.path, message: e.message }));
    return res.status(400).json({ errors });
  }
};

module.exports = validarAtualizacaoPaciente;