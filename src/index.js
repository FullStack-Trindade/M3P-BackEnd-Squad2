require("dotenv").config();
const { server } = require("./server");
const { connect } = require("./database/conexao");

connect();
server.listen(process.env.APP_PORT, () => {
  console.log(
    `Sucesso:: Servidor executando na porta: ${process.env.APP_PORT}`
  );

});

