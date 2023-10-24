require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { usuarioRoutes } = require("./routes/usuario.routes");
const { exameRoutes } = require("./routes/exames.routes");
const { dietaRoutes } = require("./routes/dietas.routes");
const server = express();

const pacientesRouter = require('./routes/pacientes.routes');
const consultaRoutes  = require('./routes/consultas.routes');

server.use(
  cors({
    origin: "*",
  })
);

server.use(express.json());
server.use(exameRoutes);


server.use('/api', usuarioRoutes, pacientesRouter, consultaRoutes, exameRoutes, dietaRoutes);


server.get("/", (request, response) => {
  response.status(200).json({
    message: `Hello World, ${process.env.APP_NAME}`,
  });
});

module.exports = {
  server,
};


