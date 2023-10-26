const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");

const sequelize = new Sequelize(DB_CONFIG);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados estabelecida com sucesso");
  } catch (err) {
    console.log("Problema de conexão com banco de dados", err);
  }
};

module.exports = {
  sequelize,
  connect,


};


