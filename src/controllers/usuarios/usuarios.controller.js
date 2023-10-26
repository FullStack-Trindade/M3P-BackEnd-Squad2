const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Usuario } = require("../../models/Usuario");
const { criarLog } = require('../logs/log.controller');

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

    const payload = request.usuario;

    if (payload.tipo !== "ADMINISTRADOR") {
      return response.status(403).json({
        message: "Usuário não tem permissões para acessar este recurso",
      });
    }

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

    await criarLog(request, `criou o usuário ${usuario.nomeCompleto} com permissão ${usuario.tipo}`);

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
    const payload = request.usuario;

    if (payload.tipo !== "ADMINISTRADOR") {
      return response.status(403).json({
        message: "Usuário não tem permissões para acessar este recurso",
      });
    }

    const { nomeCompleto, genero, telefone, senha, tipo } = request.body;

    const usuarioExistente = await Usuario.findByPk(id);

    if (!usuarioExistente) {
      return response
        .status(404)
        .json({ message: "Usuário não foi encontrado" });
    }

    const data = {
      nomeCompleto: nomeCompleto || usuarioExistente.nomeCompleto,
      genero: genero || usuarioExistente.genero,
      telefone: telefone || usuarioExistente.telefone,
      senha: senha || usuarioExistente.senha,
      tipo: tipo || usuarioExistente.tipo,
    };

    await Usuario.update(data, { where: { usuario_id: id } });

    await criarLog(request, `atualizou o usuário ${usuarioExistente.nomeCompleto}`);

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
    const payload = request.usuario;

    if (payload.tipo !== "ADMINISTRADOR") {
      return response.status(403).json({
        message: "Usuário não tem permissões para acessar este recurso",
      });
    }

    const usuarios = await Usuario.findAll();
    if (!usuarios) {
      return response
        .status(404)
        .json({ message: "Não há usuários cadastrados" });
    }
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
    const payload = request.usuario;

    if (payload.tipo !== "ADMINISTRADOR") {
      return response.status(403).json({
        message: "Usuário não tem permissões para acessar este recurso",
      });
    }

    const usuarioExistente = await Usuario.findByPk(id);

    if (!usuarioExistente) {
      return response
        .status(404)
        .json({ message: "Usuário não foi encontrado" });
    }

    if (payload.usuarioId === id) {
      return response
        .status(403)
        .json({ message: "Não é possível deletar o próprio usuário" });
    }

    await Usuario.destroy({ where: { usuario_id: id } });

    await criarLog(request, `deletou o usuário ${usuarioExistente.nomeCompleto}`);

    response.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Não foi possível processar a solicitação",
    });
  }
};

const loginUsuario = async (request, response) => {
  try {
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response
        .status(400)
        .json({ message: "Os dados do formulário são obrigatórios" });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);

    if (!senhaValida) {
      return response
        .status(401)
        .json({ message: "Email e/ou senha invalidos" });
    }

    const payload = {
      usuarioId: usuario.usuarioId,
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      tipo: usuario.tipo,
    };

    const token = sign(payload, process.env.APP_SECRET, { expiresIn: "1d" });

    return response.status(200).json({
      message: `Usuario ${usuario.email} logado com sucesso`,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Erro ao realizar o login do usuário",
    });
  }
};

const resetarSenha = async (request, response) => {
  try {
    const { email, novaSenha, codigo } = request.body;

    if (!email || !codigo || !novaSenha) {
      return response
        .status(400)
        .json({ message: "Os dados do formulário são obrigatórios" });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }

    if (codigo !== process.env.CODIGO_RESETAR_SENHA) {
      return response
        .status(400)
        .json({ message: "Código para resetar senha inválido" });
    }

    await Usuario.update(
      { senha: novaSenha },
      { where: { email }, individualHooks: true }
    );


    return response
      .status(200)
      .json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao tentar redefinir senha: ", error);
    return response
      .status(500)
      .json({ message: "Ocorreu um erro ao tentar redefinir a senha" });
  }
};

module.exports = {
  criarUsuario,
  atualizarUsuario,
  buscarUsuarios,
  deletarUsuario,
  loginUsuario,
  resetarSenha,
};
