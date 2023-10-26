const { verify } = require("jsonwebtoken");

const validarToken = (request, response, next) => {
  try {
    const { authorization } = request.headers;

    const token = authorization?.replace(/Bearer\s*/, "").trim();

    if (!token) {
      return response.status(401).json({
        message: "É necessário estar autenticado para acessar esse recurso",
      });
    }

    verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        console.error("Erro ao verificar o token:", err);
        return response
          .status(401)
          .json({ message: "Token inválido ou expirado" });
      }
      request.usuario = decoded;
      next();
    });
  } catch (error) {
    console.error("Erro ao verificar o token:", err);
    return response.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { validarToken };
