const { Op } = require("sequelize");
const Paciente = require("../../models/paciente");
const Consulta = require("../../models/consultas/consultas.model");
const Exame = require("../../models/exames/exames.model");
const Medicamento = require("../../models/medicamentos/medicamentos.model");
const Dieta = require("../../models/dietas.model");
const Exercicio = require("../../models/exercicios.model");

const buscarProntuarios = async (request, response) => {
    try {
        
        const pacientes = await Paciente.findAll();

        if(!pacientes){
            return response.status(400).json({message: "Não há prontuarios cadastrados"});
        }
    
        response.status(200).json(pacientes);
    } catch (error) {
        console.error("Erro ao listar todos os prontuarios: ", error);
        return response.status(500).json({
        message: "Erro ao listar todos os prontuarios: ", error
        });
    }
}

const buscarProntuarioId = async(request, response) => {
    try {
        const { id } = request.params;

        const paciente = await Paciente.findOne({ where: {
            id: id
          },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Consulta,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Exame,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Medicamento,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              }/* , VERIFICAR PORQUE ELE QUEBRA COM DIETA E EXERCICIO
              {
                model: Dieta,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              }, 
              {
                model: Exercicio,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },*/
            ],
          });

          if(!paciente){
            return response.status(400).json({message: "Não há prontuario cadastrado"});
          }

        return response.status(200).json(paciente);        
    } catch (error) {
        console.error("Erro ao listar o prontuario: ", error);
        return response.status(500).json({
        message: "Erro ao listar o prontuario: ", error
        });   
    }
}

module.exports = {
    buscarProntuarios,
    buscarProntuarioId
  };