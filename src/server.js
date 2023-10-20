require("dotenv").config();
const cors = require("cors");
const express = require("express");
const server = express();

const pacientesRouter = require('./routes/pacientes.routes');
const consultaRoutes  = require('./routes/consultas.routes');

server.use(
  cors({
    origin: "*",
  })
);

server.use(express.json());

//endpoints de paciente
server.use('/api', pacientesRouter);

//endpoints de consulta
server.use('/api', consultaRoutes)

server.get("/", (request, response) => {
  response.status(200).json({
    message: `Hello World, ${process.env.APP_NAME}`,
  });
});


module.exports = {
  server,
};


module.exports = {
  server,
};
