const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar JWT
 * Obtiene el token del header Authorization
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Espera formato: "Bearer <token>"
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar datos del usuario en request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
};

/**
 * Generar JWT para frontend
 * Se usa cuando el usuario inicia sesión correctamente
 */
const generateToken = (userData, expiresIn = '24h') => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
  verifyToken,
  generateToken
};
