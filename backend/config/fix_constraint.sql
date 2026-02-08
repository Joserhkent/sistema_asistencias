-- Agregar restricción UNIQUE para ON CONFLICT
ALTER TABLE asistencias DROP CONSTRAINT IF EXISTS asistencias_dni_tipo_fecha_unique;
ALTER TABLE asistencias ADD CONSTRAINT asistencias_dni_tipo_fecha_unique UNIQUE (dni, tipo, fecha);
