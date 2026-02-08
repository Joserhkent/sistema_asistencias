-- Crear base de datos (ejecutar como superusuario)
-- CREATE DATABASE sistema_asistencia;

-- Tabla de personal
CREATE TABLE IF NOT EXISTS personal (
  id SERIAL PRIMARY KEY,
  dni VARCHAR(8) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de asistencias
CREATE TABLE IF NOT EXISTS asistencias (
  id SERIAL PRIMARY KEY,
  dni VARCHAR(8) NOT NULL REFERENCES personal(dni) ON DELETE CASCADE,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'salida')),
  hora TIME NOT NULL,
  fecha DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(dni, tipo, fecha)
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_asistencias_fecha ON asistencias(fecha);
CREATE INDEX IF NOT EXISTS idx_asistencias_dni ON asistencias(dni);

-- Datos de ejemplo (opcional)
INSERT INTO personal (dni, nombre, apellido) VALUES 
  ('12345678', 'Juan', 'Pérez'),
  ('87654321', 'María', 'García'),
  ('11223344', 'Carlos', 'López')
ON CONFLICT (dni) DO NOTHING;
