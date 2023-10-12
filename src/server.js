require("dotenv").config();
const cors = require("cors");
const express = require("express");
const server = express();

server.use(
  cors({
    origin: "*",
  })
);

server.use(express.json());


server.get("/", (request, response) => {
  response.status(200).json({
    message: `Hello World, ${process.env.APP_NAME}`,
  });
});


module.exports = {
  server,
};
