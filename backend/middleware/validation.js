const { validationResult, body, param } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: errors.array().map(err => ({
        campo: err.param,
        mensaje: err.msg,
        valor: err.value
      }))
    });
  }
  next();
};

/**
 * Validaciones para Personal
 */
const validarPersonal = [
  body('dni')
    .trim()
    .matches(/^\d{8}$/)
    .withMessage('DNI debe tener exactamente 8 dígitos')
    .escape(),
  body('nombre')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/)
    .withMessage('Nombre solo puede contener letras y espacios')
    .escape(),
  body('apellido')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Apellido debe tener entre 2 y 100 caracteres')
    .matches(/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/)
    .withMessage('Apellido solo puede contener letras y espacios')
    .escape()
];

/**
 * Validaciones para Asistencia
 */
const validarAsistencia = [
  body('dni')
    .trim()
    .matches(/^\d{8}$/)
    .withMessage('DNI debe tener exactamente 8 dígitos')
    .escape(),
  body('tipo')
    .trim()
    .isIn(['entrada', 'salida'])
    .withMessage('Tipo debe ser "entrada" o "salida"')
    .escape()
];

/**
 * Validación para parámetro DNI
 */
const validarDniParam = [
  param('dni')
    .trim()
    .matches(/^\d{8}$/)
    .withMessage('DNI debe tener exactamente 8 dígitos')
    .escape()
];

/**
 * Validación para parámetro fecha
 */
const validarFechaParam = [
  param('fecha')
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Fecha debe estar en formato YYYY-MM-DD')
    .isISO8601()
    .withMessage('Fecha no es válida')
];

module.exports = {
  handleValidationErrors,
  validarPersonal,
  validarAsistencia,
  validarDniParam,
  validarFechaParam
};
