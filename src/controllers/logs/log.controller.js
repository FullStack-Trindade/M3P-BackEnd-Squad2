const Log = require('../../models/log.model'); 

async function criarLog(req, acao) {
      //verifica se a req tem um usuario vindo do front, se tiver pega o nome dele, se não, pega o nome defalt Não Identificado
      const usuarioNome = req.usuario.nomeCompleto
      const registro = `O usuário ${usuarioNome} ${acao}`;
      await Log.create({ registro });
    }


// Função para listar todos os registros de log
const listarLogs = async (req, res) => {
    try {
      const logs = await Log.findAll({
        attributes: ['id', 'registro', 'dataHora'], 
        order: [['dataHora', 'DESC']], 
      });
  
      return res.status(200).json(logs);
    } catch (error) {
      console.error('Erro ao listar registros de log:', error);
      return res.status(500).json({ message: 'Erro ao listar registros de log', error });
    }
  };

module.exports = {
  criarLog,
  listarLogs,
};
