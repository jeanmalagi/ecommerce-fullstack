import jwt from "jsonwebtoken";

export const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    // ✅ Sem token
    if (!authHeader) {
      return res.status(401).json({
        error: "Token não enviado",
      });
    }

    // ✅ Bearer TOKEN
    const token =
      authHeader.split(" ")[1];

    // ✅ Verifica JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
};