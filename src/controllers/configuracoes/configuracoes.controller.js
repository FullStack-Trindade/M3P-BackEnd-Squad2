const { Configuracoes } = require("../../models/Configuracoes");

const cadastrarConfiguracoes = async (request, response) => {
	try {
		const payload = request.usuario;

		if (payload.tipo !== "ADMINISTRADOR") {
			return response.status(403).json({
				message: "Usuário não tem permissões para acessar este recurso",
			});
		}

		const { nomeEmpresa, slogan, corPrimaria, corSecundaria, imagemLogo } =
			request.body;

		if (
			!nomeEmpresa ||
			!slogan ||
			!corPrimaria ||
			!corSecundaria ||
			!imagemLogo
		) {
			return response.status(400).json({
				message: "Todos os campos são obrigatórios",
			});
		}

		const configuracao = await Configuracoes.create({
			nomeEmpresa,
			slogan,
			corPrimaria,
			corSecundaria,
			imagemLogo,
		});
		response.status(201).json({
			message: "Configuração cadastrada com sucesso",
			data: configuracao,
		});
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: "Não foi possível Cadastrar configuração",
		});
	}
};

const atualizarConfiguracoes = async (request, response) => {
	try {
		const { id } = request.params;
		const payload = request.usuario;

		if (payload.tipo !== "ADMINISTRADOR") {
			return response.status(403).json({
				message: "Usuário não tem permissões para acessar este recurso",
			});
		}

		const { nomeEmpresa, slogan, corPrimaria, corSecundaria, imagemLogo } =
			request.body;

		const configuracaoExistente = await Configuracoes.findByPk(id);

		if (!configuracaoExistente) {
			return response
				.status(404)
				.json({ message: "Configuração não foi encontrada" });
		}

		const data = {
			nomeEmpresa: nomeEmpresa || configuracaoExistente.nomeEmpresa,
			slogan: slogan || configuracaoExistente.slogan,
			corPrimaria: corPrimaria || configuracaoExistente.corPrimaria,
			corSecundaria: corSecundaria || configuracaoExistente.corSecundaria,
			imagemLogo: imagemLogo || configuracaoExistente.imagemLogo,
		};

		await Configuracoes.update(data, { where: { id: id } });
		response
			.status(200)
			.json({ message: "Configuração atualizada com sucesso", data: data });
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: "Não foi possível Atualizar configuração",
		});
	}
};

const buscarConfiguracoes = async (request, response) => {
	try {
		const payload = request.usuario;

		if (payload.tipo !== "ADMINISTRADOR") {
			return response.status(403).json({
				message: "Usuário não tem permissões para acessar este recurso",
			});
		}

		const configuracoes = await Configuracoes.findAll();
		if (!configuracoes) {
			return response
				.status(404)
				.json({ message: "Configurações não foram encontradas" });
		}

		response.status(200).json(configuracoes);
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: "Não foi possível buscar configurações",
		});
	}
};

const buscarConfiguracaoId = async (request, response) => {
	try {
		const { id } = request.params;
		const payload = request.usuario;

		if (payload.tipo !== "ADMINISTRADOR") {
			return response.status(403).json({
				message: "Usuário não tem permissões para acessar este recurso",
			});
		}

		const configuracao = await Configuracoes.findByPk(id);
		if (!configuracao) {
			return response
				.status(404)
				.json({ message: "Configuração não foi encontrada" });
		}
		response.status(200).json(configuracao);
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: "Não foi possível buscar configuração",
		});
	}
};

const deletarConfiguracao = async (request, response) => {
	try {
		const { id } = request.params;
		const payload = request.usuario;

		if (payload.tipo !== "ADMINISTRADOR") {
			return response.status(403).json({
				message: "Usuário não tem permissões para acessar este recurso",
			});
		}
		const configuracao = await Configuracoes.findByPk(id);
		if (!configuracao) {
			return response
				.status(404)
				.json({ message: "Configuração não foi encontrada" });
		}
		await Configuracoes.destroy({ where: { id: id } });
		response.status(200).json({ message: "Configuração deletada com sucesso" });
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: "Não foi possível deletar configuração",
		});
	}
};

const restaurarConfiguracao = async (request, response) => {
	try {
		const { id } = request.params;
		const payload = request.usuario;

		if (payload.tipo !== "ADMINISTRADOR") {
			return response.status(403).json({
				message: "Usuário não tem permissões para acessar este recurso",
			});
		}
		const configuracao = await Configuracoes.findByPk(id, {
			paranoid: false,
		});
		if (!configuracao) {
			return response
				.status(404)
				.json({ message: "Configuração não foi encontrada" });
		}
		await Configuracoes.restore({ where: { id: id } });
		response
			.status(200)
			.json({ message: "Configuração restaurada com sucesso" });
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: "Não foi possível restaurar configuração",
		});
	}
};

module.exports = {
	cadastrarConfiguracoes,
	atualizarConfiguracoes,
	buscarConfiguracoes,
	buscarConfiguracaoId,
	deletarConfiguracao,
	restaurarConfiguracao,
};
