require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { usuarioRoutes } = require("./routes/usuario.routes");
const { exameRoutes } = require("./routes/exames.routes");
const server = express();

const pacientesRouter = require('./routes/pacientes.routes');
const exerciciosRoutes = require ('./routes/exercicios.routes')

server.use(
  cors({
    origin: "*",
  })
);

server.use(express.json());
server.use(exameRoutes);

//endpoints de usuario e paciente
server.use('/api', usuarioRoutes, pacientesRouter, exerciciosRoutes);

//rota de teste da api apagar depois
server.get("/", (request, response) => {
  response.status(200).json({
    message: `Hello World, ${process.env.APP_NAME}`,
  });
});

module.exports = {
  server,
};
