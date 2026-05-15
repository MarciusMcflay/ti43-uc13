import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ erro: "Token não enviado" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // convenção: sub = id do usuário
    req.logeded = {
      id: payload.sub,
      rule: payload.rule,
      email: payload.email,
      name: payload.name
    };
    return next();
  } catch (e) {
    return res.status(403).json({ erro: e.message });
  }
}
