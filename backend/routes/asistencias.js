const express = require('express');
const router = express.Router();
const {
  getAsistencias,
  getReporte,
  registrarAsistencia,
  getAsistenciasByDni
} = require('../controllers/asistenciaController');
const {
  validarAsistencia,
  validarDniParam,
  validarFechaParam,
  handleValidationErrors
} = require('../middleware/validation');

// GET /api/asistencias - Obtener todas las asistencias (filtro opcional: ?fecha=YYYY-MM-DD)
router.get('/', getAsistencias);

// GET /api/asistencias/reporte/:fecha - Obtener reporte de asistencias por fecha
router.get('/reporte/:fecha', validarFechaParam, handleValidationErrors, getReporte);

// GET /api/asistencias/empleado/:dni - Obtener asistencias de un empleado
router.get('/empleado/:dni', validarDniParam, handleValidationErrors, getAsistenciasByDni);

// POST /api/asistencias - Registrar asistencia
router.post('/', validarAsistencia, handleValidationErrors, registrarAsistencia);

module.exports = router;
