const { INTEGER, STRING, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../database/conexao");

const Paciente = require("../paciente");

const Medicamento = sequelize.define(
    "medicamentos",
    {
        id:  {
            type: INTEGER,
            primaryKey: true,
            autoIcremenent: true,
            allowNull: false,
        },
        nomeMedicamento:{
            type: STRING(100),
            allowNull: false,
        },
        dataMedicamento:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        horaMedicamento:{
            type: DataTypes.TIME(6),
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        tipoMedicamento: {
            type: DataTypes.ENUM('CAPSULA', 'COMPRIMIDO', 'LIQUIDO', 'CREME', 'GEL', 'INALACAO', 'INJECAO', 'SPRAY' ),
            allowNull: false,
        },
        quantidadeMedicamento: {
            type: DataTypes.DECIMAL(11,10),
            allowNull: false,
        },
        unidadeMedicamento:{
            type: DataTypes.ENUM('mg', 'mcg', 'g','mL', '%'),
            allowNull: false,
        },
        observacoesMedicamento:{
            type: STRING(100),
            allowNull: false,
        },
        statusDoSistema:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }, 
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        update_at:{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        paciente_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model: "pacientes",
                key: "id",
            }
        }, 
        paciente_nome:{
            type: Sequelize.STRING,
            alloqNull: false,
            references:{
                model:"pacientes",
                key:"nome_completo",
            }
        },

    },
    {underscored: true, paranoid: true}
)
Medicamento.belongsTo(Paciente, {foreignKey: "paciente_id"})
Paciente.hasMany(Medicamento, {foreignKey: "paciente_id"})


module.exports = Medicamento
