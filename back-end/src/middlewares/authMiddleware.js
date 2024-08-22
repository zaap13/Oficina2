import jwt from "jsonwebtoken";

const chaveSecreta = process.env.JWTSecret;

function verificarToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ mensagem: "Token não fornecido ou inválido" });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, chaveSecreta, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensagem: "Token inválido" });
    }

    req.usuario = decoded;
    next();
  });
}

function verificarAdmin(req, res, next) {
  if (req.usuario && req.usuario.tipo === "admin") {
    next();
  } else {
    return res.status(403).json({ mensagem: "Acesso não autorizado" });
  }
}

export { verificarToken, verificarAdmin };
