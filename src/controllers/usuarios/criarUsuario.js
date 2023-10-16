const { Usuario } = require("../../models/Usuario");

const criarUsuario = async (request, response) => {
  try {
    const {
      nomeCompleto,
      genero,
      cpf,
      telefone,
      email,
      senha,
      tipo,
      statusSistema,
    } = request.body;

    const usuario = await Usuario.create({
      nomeCompleto,
      genero,
      cpf,
      telefone,
      email,
      senha,
      tipo,
      statusSistema,
    });
    response.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

module.exports = { criarUsuario };
