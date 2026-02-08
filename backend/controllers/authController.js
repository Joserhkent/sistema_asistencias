const { generateToken } = require('../middleware/auth');

/**
 * Login de administrador
 * Verifica credenciales contra variables de entorno
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que los parámetros existan
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    // Validar credenciales (estas vienen del .env por seguridad)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (username !== adminUsername || password !== adminPassword) {
      // NO revelar cuál credencial es incorrecta (seguridad)
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = generateToken({
      username: username,
      role: 'admin',
      loginTime: new Date().toISOString()
    });

    res.json({
      message: 'Login exitoso',
      token: token,
      expiresIn: '24h'
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al procesar login' });
  }
};

/**
 * Validar token (útil para frontend)
 */
const validateToken = (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
};

module.exports = {
  login,
  validateToken
};
