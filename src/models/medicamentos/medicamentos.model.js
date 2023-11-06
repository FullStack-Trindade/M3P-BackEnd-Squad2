const { INTEGER, STRING, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../database/conexao");

const Paciente = require("../paciente");

const Medicamento = sequelize.define(
    "medicamentos",
    {
        id:  {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            type: DataTypes.DECIMAL(15,10),
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
        updated_at:{
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
    },
)
Medicamento.belongsTo(Paciente, {foreignKey: "paciente_id"})
Paciente.hasMany(Medicamento, {foreignKey: "paciente_id"})


module.exports = Medicamento
