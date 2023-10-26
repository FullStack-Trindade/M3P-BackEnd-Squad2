require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { usuarioRoutes } = require("./routes/usuario.routes");
const { exameRoutes } = require("./routes/exames.routes");
const { dietaRoutes } = require("./routes/dietas.routes");
const { logRoutes } = require("./routes/log.routes");
const server = express();

const pacientesRouter = require('./routes/pacientes.routes');
const consultaRoutes  = require('./routes/consultas.routes');
const exerciciosRoutes = require('./routes/exercicios.routes')

server.use(
  cors({
    origin: "*",
  })
);

server.use(express.json());



server.use('/api', usuarioRoutes, pacientesRouter, consultaRoutes, exameRoutes, dietaRoutes, exerciciosRoutes, logRoutes );



server.get("/", (request, response) => {
  response.status(200).json({
    message: `Hello World, ${process.env.APP_NAME}`,
  });
});

module.exports = {
  server,
};


