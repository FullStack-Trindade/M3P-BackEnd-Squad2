require("dotenv").config();
const { server } = require("./server");
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("./config/database");

const sequelize = new Sequelize(DB_CONFIG);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados estabelecida com sucesso");
  } catch (err) {
    console.log("Problema de conexão com banco de dados", err);
  }
};


connect();
server.listen(process.env.APP_PORT, () => {
  console.log(`Sucesso:: Servidor executando na porta: ${process.env.APP_PORT}`);
});
