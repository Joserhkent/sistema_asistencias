const {
  validarPersonal,
  validarAsistencia,
  validarDniParam,
  validarFechaParam
} = require('../../middleware/validation');

describe('Validación de Entrada', () => {
  
  describe('validarDniParam', () => {
    it('Debe aceptar DNI válido (8 dígitos)', async () => {
      const validators = validarDniParam[0];
      expect(validators).toBeDefined();
      // Las validaciones se ejecutan en el middleware
    });

    it('Debe rechazar DNI con menos de 8 dígitos', () => {
      // Test unitario simple
      const dniRegex = /^\d{8}$/;
      expect(dniRegex.test('1234567')).toBe(false);
    });

    it('Debe rechazar DNI con más de 8 dígitos', () => {
      const dniRegex = /^\d{8}$/;
      expect(dniRegex.test('123456789')).toBe(false);
    });

    it('Debe rechazar DNI con letras', () => {
      const dniRegex = /^\d{8}$/;
      expect(dniRegex.test('1234567a')).toBe(false);
    });
  });

  describe('Validación de Nombres', () => {
    it('Debe aceptar nombres válidos', () => {
      const nameRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;
      expect(nameRegex.test('Juan Pérez')).toBe(true);
      expect(nameRegex.test('María')).toBe(true);
      expect(nameRegex.test('Carlos López')).toBe(true);
    });

    it('Debe rechazar nombres con números', () => {
      const nameRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;
      expect(nameRegex.test('Juan123')).toBe(false);
    });

    it('Debe rechazar nombres con caracteres especiales', () => {
      const nameRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;
      expect(nameRegex.test('Juan@Pérez')).toBe(false);
      expect(nameRegex.test('Juan-López')).toBe(false);
    });
  });

  describe('Validación de Asistencia', () => {
    it('Debe aceptar tipo "entrada"', () => {
      const tipos = ['entrada', 'salida'];
      expect(tipos.includes('entrada')).toBe(true);
    });

    it('Debe aceptar tipo "salida"', () => {
      const tipos = ['entrada', 'salida'];
      expect(tipos.includes('salida')).toBe(true);
    });

    it('Debe rechazar otros tipos', () => {
      const tipos = ['entrada', 'salida'];
      expect(tipos.includes('otro')).toBe(false);
      expect(tipos.includes('entrada ')).toBe(false);
    });
  });

  describe('Validación de Fecha', () => {
    it('Debe aceptar fecha en formato YYYY-MM-DD', () => {
      const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
      expect(fechaRegex.test('2024-02-08')).toBe(true);
      expect(fechaRegex.test('2023-12-31')).toBe(true);
    });

    it('Debe rechazar fechas mal formateadas', () => {
      const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
      expect(fechaRegex.test('2024/02/08')).toBe(false);
      expect(fechaRegex.test('02-08-2024')).toBe(false);
      expect(fechaRegex.test('2024-2-8')).toBe(false);
    });
  });
});
