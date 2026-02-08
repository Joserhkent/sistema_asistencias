const request = require('supertest');
const express = require('express');

describe('Autenticación - JWT', () => {
  let app;

  beforeAll(() => {
    // Configurar variables de entorno
    process.env.JWT_SECRET = 'test_secret_key_for_testing_only_32_chars_min';
    process.env.ADMIN_USERNAME = 'admin';
    process.env.ADMIN_PASSWORD = 'testpassword123';
    
    // Crear app de prueba
    app = express();
    app.use(express.json());
    
    // Importar rutas
    const authRoutes = require('../../routes/auth');
    app.use('/api/auth', authRoutes);
  });

  describe('POST /api/auth/login', () => {
    it('Debe devolver token con credenciales válidas', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'testpassword123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.token).toBeTruthy();
      expect(res.body.expiresIn).toBe('24h');
    });

    it('Debe rechazar credenciales inválidas', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Credenciales inválidas');
    });

    it('Debe validar que username es requerido', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'testpassword123'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Datos inválidos');
    });

    it('Debe validar que password es requerido', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Datos inválidos');
    });

    it('Debe rechazar usuario incorrecto', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'wronguser',
          password: 'testpassword123'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Credenciales inválidas');
    });
  });
});
