const Yup = require("yup");
const { Usuario } = require("../models/Usuario");

const usuarioSchema = Yup.object().shape({
  nomeCompleto: Yup.string()
    .max(64, "Nome completo deve conter no máximo 64 caracteres")
    .min(8, "Nome completo deve conter no mínimo 8 caracteres")
    .matches(
      /^[a-zA-ZÀ-ú\s]+$/,
      "O nome completo deve conter apenas letras e espaços"
    ),
  genero: Yup.string().oneOf(
    ["FEMININO", "MASCULINO", "OUTRO"],
    "O gênero deve ser FEMININO, MASCULINO ou OUTRO"
  ),
  cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00'),
  telefone: Yup.string().matches(/\(\d{2}\) \d \d{4}-\d{4}/, 'Telefone deve estar no formato (99) 9 9999-9999'),
  email: Yup.string().email("O email deve ser válido"),
  senha: Yup.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  tipo: Yup.string().oneOf(
    ["ADMINISTRADOR", "MEDICO", "ENFERMEIRO"],
    "O tipo deve ser ADMINISTRADOR, MEDICO ou ENFERMEIRO"
  ),
  statusSistema: Yup.boolean()
    .required("O status do sistema é obrigatório!")
    .default(true)
    .oneOf([true]),
});

const validarAtualizarUsuario = async (request, response, next) => {
  try {
    await usuarioSchema.validate(request.body, { abortEarly: false });
    next();
  } catch (error) {
    //Faz um map para percorrer todos os erros e retornar um objeto com o campo e a mensagem
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return response.status(400).json(errors);
  }
};

module.exports = { validarAtualizarUsuario };
