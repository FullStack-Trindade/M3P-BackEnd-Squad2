const { verify } = require("jsonwebtoken");

const validarToken = (request, response, next) => {
  const { authorization } = request.headers;

  const token = authorization?.replace("Bearer", "").trim();

  if (!token) {
    return response.status(401).json({
      message: "É necessário estar autenticado para acessar esse recurso",
    });
  }

  verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return response.status(401).json({ message: "Token expirado" });
      } else if (err.name === "JsonWebTokenError") {
        return response.status(401).json({ message: "Token inválido" });
      } else {
        return response
          .status(500)
          .json({ message: "Erro interno do servidor" });
      }
    } else {
      request.usuario = decoded;
      next();
    }
  });
};

module.exports = { validarToken };
