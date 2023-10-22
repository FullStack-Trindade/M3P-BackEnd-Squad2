const yup = require('yup');

const schema = yup.object().shape({
  nome_completo: yup
    .string()
    .required('Nome Completo é obrigatório')
    .min(8, 'Nome Completo deve ter pelo menos 8 caracteres')
    .max(64, 'Nome Completo deve ter no máximo 64 caracteres'),

  genero: yup
    .string()
    .required('Gênero é obrigatório')
    .oneOf(['MASCULINO', 'FEMININO', 'OUTRO'], 'Gênero deve ser MASCULINO, FEMININO ou OUTRO'),


  data_nascimento: yup
    .date()
    .required('Data de Nascimento é obrigatória')
    .max(new Date(), 'Data de Nascimento deve ser uma data válida'),

  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00'),

  rg: yup
    .string()
    .required('RG com órgão expedidor é obrigatório')
    .max(20, 'RG com órgão expedidor deve ter no máximo 20 caracteres'),

  estado_civil: yup
    .string()
    .required('Estado Civil é obrigatório')
    .oneOf(['SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO'], 'Estado Civil deve ser SOLTEIRO, CASADO, DIVORCIADO ou VIUVO'),

  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/\(\d{2}\) \d \d{4}-\d{4}/, 'Telefone deve estar no formato (99) 9 9999-9999'),

  email: yup.string().required('E-mail é obrigatório').email('E-mail deve ser válido'),

  naturalidade: yup
    .string()
    .required('Naturalidade é obrigatória')
    .min(8, 'Naturalidade deve ter pelo menos 8 caracteres')
    .max(64, 'Naturalidade deve ter no máximo 64 caracteres'),

  contato_emergencia: yup
    .string()
    .required('Contato de Emergência é obrigatório')
    .matches(/\(\d{2}\) \d \d{4}-\d{4}/, 'Contato de Emergência deve estar no formato (99) 9 9999-9999'),

  endereco: yup.object().shape({
    cep: yup.string().required('CEP é obrigatório'),
    cidade: yup.string().required('Cidade é obrigatória'),
    estado: yup.string().required('Estado é obrigatório'),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    numero: yup.string().required('Número é obrigatório'),
    bairro: yup.string().required('Bairro é obrigatório'),
  }),

  status: yup.boolean().required('Status é obrigatório'),
});

const validarNovoPaciente = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((e) => ({ field: e.path, message: e.message }));
    return res.status(400).json({ errors });
  }
};

module.exports = validarNovoPaciente;