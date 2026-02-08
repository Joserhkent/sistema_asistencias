const pool = require('../config/database');
const { obtenerHoraPerú, obtenerFechaPerú } = require('../utils/tiempoPerú');

// Obtener todas las asistencias (con filtro opcional por fecha)
const getAsistencias = async (req, res) => {
  const { fecha } = req.query;
  try {
    let query = `
      SELECT a.id, a.dni, a.tipo, a.hora::text, a.fecha::text, p.nombre, p.apellido
      FROM asistencias a
      JOIN personal p ON a.dni = p.dni
    `;
    const params = [];
    
    if (fecha) {
      query += ' WHERE a.fecha = $1';
      params.push(fecha);
    }
    
    query += ' ORDER BY a.fecha DESC, a.hora DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener asistencias:', error);
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
};

// Obtener reporte de asistencias por fecha
const getReporte = async (req, res) => {
  const { fecha } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        p.dni,
        p.nombre,
        p.apellido,
        MAX(CASE WHEN a.tipo = 'entrada' THEN a.hora::text END) as hora_entrada,
        MAX(CASE WHEN a.tipo = 'salida' THEN a.hora::text END) as hora_salida
      FROM personal p
      LEFT JOIN asistencias a ON p.dni = a.dni AND a.fecha = $1
      WHERE a.id IS NOT NULL
      GROUP BY p.dni, p.nombre, p.apellido
      ORDER BY p.apellido, p.nombre
    `, [fecha]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener reporte:', error);
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
};

// Registrar asistencia (entrada o salida)
const registrarAsistencia = async (req, res) => {
  const { dni, tipo } = req.body;
  
  // Validaciones
  if (!dni || !tipo) {
    return res.status(400).json({ error: 'DNI y tipo son requeridos' });
  }

  if (!['entrada', 'salida'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo debe ser "entrada" o "salida"' });
  }

  try {
    // Verificar que el personal existe
    const personalResult = await pool.query('SELECT * FROM personal WHERE dni = $1', [dni]);
    if (personalResult.rows.length === 0) {
      return res.status(404).json({ error: 'DNI no encontrado en el sistema' });
    }

    const hora = obtenerHoraPerú();
    const fecha = obtenerFechaPerú();

    // Verificar si ya existe un registro para este dni, tipo y fecha
    const existeResult = await pool.query(
      'SELECT id FROM asistencias WHERE dni = $1 AND tipo = $2 AND fecha = $3',
      [dni, tipo, fecha]
    );

    let result;
    if (existeResult.rows.length > 0) {
      // Actualizar registro existente
      result = await pool.query(
        'UPDATE asistencias SET hora = $1 WHERE dni = $2 AND tipo = $3 AND fecha = $4 RETURNING id, dni, tipo, hora::text, fecha::text',
        [hora, dni, tipo, fecha]
      );
    } else {
      // Insertar nuevo registro
      result = await pool.query(
        'INSERT INTO asistencias (dni, tipo, hora, fecha) VALUES ($1, $2, $3, $4) RETURNING id, dni, tipo, hora::text, fecha::text',
        [dni, tipo, hora, fecha]
      );
    }

    const persona = personalResult.rows[0];
    res.status(201).json({
      ...result.rows[0],
      nombre: persona.nombre,
      apellido: persona.apellido,
      message: `${tipo === 'entrada' ? 'Entrada' : 'Salida'} registrada para ${persona.nombre} ${persona.apellido} a las ${hora}`
    });
  } catch (error) {
    console.error('Error al registrar asistencia:', error);
    res.status(500).json({ error: 'Error al registrar asistencia' });
  }
};

// Obtener asistencias de un empleado específico
const getAsistenciasByDni = async (req, res) => {
  const { dni } = req.params;
  const { fechaInicio, fechaFin } = req.query;
  
  try {
    let query = `
      SELECT a.id, a.dni, a.tipo, a.hora::text, a.fecha::text
      FROM asistencias a
      WHERE a.dni = $1
    `;
    const params = [dni];
    
    if (fechaInicio && fechaFin) {
      query += ' AND a.fecha BETWEEN $2 AND $3';
      params.push(fechaInicio, fechaFin);
    }
    
    query += ' ORDER BY a.fecha DESC, a.hora DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener asistencias:', error);
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
};

module.exports = {
  getAsistencias,
  getReporte,
  registrarAsistencia,
  getAsistenciasByDni
};
