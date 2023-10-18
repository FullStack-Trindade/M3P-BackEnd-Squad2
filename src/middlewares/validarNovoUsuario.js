const Yup = require("yup");
const { Usuario } = require("../models/Usuario");

const usuarioSchema = Yup.object().shape({
  nomeCompleto: Yup.string()
    .required("O nome completo é obrigatório!")
    .max(64, "Nome completo deve conter no máximo 64 caracteres")
    .min(8, "Nome completo deve conter no mínimo 8 caracteres")
    .matches(
      /^[a-zA-ZÀ-ú\s]+$/,
      "O nome completo deve conter apenas letras e espaços"
    ),
  genero: Yup.string()
    .required("O gênero é obrigatório!")
    .oneOf(
      ["FEMININO", "MASCULINO", "OUTRO"],
      "O gênero deve ser FEMININO, MASCULINO ou OUTRO"
    ),
  cpf: Yup.string()
    .required("O CPF é obrigatório!")
    .matches(/^\d{11}$/, "O CPF deve conter apenas números e ter 11 dígitos")
    .test("unique", "Este usuário já foi cadastrado", async (cpf) => {
      const usuario = await Usuario.findOne({ where: { cpf: cpf } });
      return !usuario;
    }),
  telefone: Yup.string()
    .required("O telefone é obrigatório!")
    .matches(
      /^\d{11}$/,
      "O número de telefone deve ter apenas números e ter 11 dígitos"
    ),
  email: Yup.string()
    .required("O email é obrigatório!")
    .email("O email deve ser válido"),
  senha: Yup.string()
    .required("A senha é obrigatória!")
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
  tipo: Yup.string()
    .required("O tipo é obrigatório!")
    .oneOf(
      ["ADMINISTRADOR", "MEDICO", "ENFERMEIRO"],
      "O tipo deve ser ADMINISTRADOR, MEDICO ou ENFERMEIRO"
    ),
  statusSistema: Yup.boolean()
    .required("O status do sistema é obrigatório!")
    .default(true)
    .oneOf([true]),
});

async function validarNovoUsuario(request, response, next) {
  try {
    await usuarioSchema.validate(request.body, { abortEarly: false });
    next();
  } catch (error) {
    //Faz um map para percorrer todos os erros e retornar um objeto com o campo e a mensagem
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));

    //Verificar se o erro é de validação única (cpf já cadastrado)
    const uniqueError = error.inner.find(
      (err) => err.path === "cpf" && err.type === "unique"
    );
    if (uniqueError) {
      const index = errors.findIndex((err) => err.field === "cpf");
      if (index !== -1) {
        errors.splice(index, 1);
      }
      errors.push({ message: uniqueError.message });
      return response.status(409).json(errors);
    }

    return response.status(400).json(errors);
  }
}

module.exports = { validarNovoUsuario };
