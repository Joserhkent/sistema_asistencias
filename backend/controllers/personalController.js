const pool = require('../config/database');

// Obtener todo el personal
const getPersonal = async (req, res) => {
  try {
    const result = await pool.query('SELECT dni, nombre, apellido FROM personal ORDER BY apellido, nombre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener personal:', error);
    res.status(500).json({ error: 'Error al obtener personal' });
  }
};

// Obtener personal por DNI
const getPersonalByDni = async (req, res) => {
  const { dni } = req.params;
  try {
    const result = await pool.query('SELECT dni, nombre, apellido FROM personal WHERE dni = $1', [dni]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Personal no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al buscar personal:', error);
    res.status(500).json({ error: 'Error al buscar personal' });
  }
};

// Agregar nuevo personal
const createPersonal = async (req, res) => {
  const { dni, nombre, apellido } = req.body;

  // Validaciones
  if (!dni || !nombre || !apellido) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  if (dni.length !== 8) {
    return res.status(400).json({ error: 'El DNI debe tener 8 dígitos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO personal (dni, nombre, apellido) VALUES ($1, $2, $3) RETURNING dni, nombre, apellido',
      [dni, nombre, apellido]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Violación de unicidad
      return res.status(409).json({ error: 'Ya existe un personal con ese DNI' });
    }
    console.error('Error al crear personal:', error);
    res.status(500).json({ error: 'Error al crear personal' });
  }
};

// Eliminar personal
const deletePersonal = async (req, res) => {
  const { dni } = req.params;
  try {
    const result = await pool.query('DELETE FROM personal WHERE dni = $1 RETURNING *', [dni]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Personal no encontrado' });
    }
    res.json({ message: 'Personal eliminado exitosamente', personal: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar personal:', error);
    res.status(500).json({ error: 'Error al eliminar personal' });
  }
};

// Actualizar personal
const updatePersonal = async (req, res) => {
  const { dni } = req.params;
  const { nombre, apellido } = req.body;

  try {
    const result = await pool.query(
      'UPDATE personal SET nombre = $1, apellido = $2 WHERE dni = $3 RETURNING dni, nombre, apellido',
      [nombre, apellido, dni]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Personal no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar personal:', error);
    res.status(500).json({ error: 'Error al actualizar personal' });
  }
};

module.exports = {
  getPersonal,
  getPersonalByDni,
  createPersonal,
  deletePersonal,
  updatePersonal
};
