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

const atualizarUsuario = async (request, response) => {
  try {
    const { id } = request.params;

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

    const usuarioExistente = await Usuario.findByPk(id);

    if (!usuarioExistente) {
      return response
        .status(404)
        .json({ message: "Usuário não foi encontrado" });
    }

    const data = {
      nomeCompleto: nomeCompleto || usuarioExistente.nomeCompleto,
      genero: genero || usuarioExistente.genero,
      cpf: cpf || usuarioExistente.cpf,
      telefone: telefone || usuarioExistente.telefone,
      email: email || usuarioExistente.email,
      senha: senha || usuarioExistente.senha,
      tipo: tipo || usuarioExistente.tipo,
      statusSistema: statusSistema || usuarioExistente.statusSistema,
    };

    await Usuario.update(data, { where: { usuario_id: id } });
    response.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

const buscarUsuarios = async (request, response) => {
  try {
    const usuarios = await Usuario.findAll();
    response.status(200).json({ usuarios });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

const deletarUsuario = async (request, response) => {
  try {
    const { id } = request.params;

    const usuarioExistente = await Usuario.findByPk(id);

    if (!usuarioExistente) {
      return response
        .status(404)
        .json({ message: "Usuário não foi encontrado" });
    }

    await Usuario.destroy({ where: { usuario_id: id } });
    response.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

module.exports = {
  criarUsuario,
  atualizarUsuario,
  buscarUsuarios,
  deletarUsuario,
};
