const express = require('express');
const router = express.Router();
const {
  getPersonal,
  getPersonalByDni,
  createPersonal,
  deletePersonal,
  updatePersonal
} = require('../controllers/personalController');
const {
  validarPersonal,
  validarDniParam,
  handleValidationErrors
} = require('../middleware/validation');

// GET /api/personal - Obtener todo el personal
router.get('/', getPersonal);

// GET /api/personal/:dni - Obtener personal por DNI
router.get('/:dni', validarDniParam, handleValidationErrors, getPersonalByDni);

// POST /api/personal - Crear nuevo personal
router.post('/', validarPersonal, handleValidationErrors, createPersonal);

// PUT /api/personal/:dni - Actualizar personal
router.put('/:dni', validarDniParam, validarPersonal, handleValidationErrors, updatePersonal);

// DELETE /api/personal/:dni - Eliminar personal
router.delete('/:dni', validarDniParam, handleValidationErrors, deletePersonal);

module.exports = router;
