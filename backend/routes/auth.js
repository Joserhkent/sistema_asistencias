const express = require('express');
const router = express.Router();
const { login, validateToken } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

/**
 * POST /api/auth/login
 * Autentica al administrador y devuelve un JWT
 */
router.post('/login',
  body('username').trim().isLength({ min: 1 }).withMessage('Usuario requerido'),
  body('password').trim().isLength({ min: 1 }).withMessage('Contraseña requerida'),
  handleValidationErrors,
  login
);

/**
 * GET /api/auth/validate
 * Valida que el JWT es válido (protegida)
 */
router.get('/validate', verifyToken, validateToken);

module.exports = router;
