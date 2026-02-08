const jwt = require('jsonwebtoken');
const { verifyToken, generateToken } = require('../../middleware/auth');

describe('Middleware de Autenticación JWT', () => {
  const JWT_SECRET = 'test_secret_key_minimum_32_characters_long';

  beforeAll(() => {
    process.env.JWT_SECRET = JWT_SECRET;
  });

  describe('generateToken', () => {
    it('Debe generar un token válido', () => {
      const userData = { username: 'admin', role: 'admin' };
      const token = generateToken(userData);

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');

      // Verificar que se puede decodificar
      const decoded = jwt.verify(token, JWT_SECRET);
      expect(decoded.username).toBe('admin');
      expect(decoded.role).toBe('admin');
    });

    it('Debe generar token con expiración', () => {
      const userData = { username: 'admin' };
      const token = generateToken(userData, '1h');

      const decoded = jwt.verify(token, JWT_SECRET);
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - now;

      // Debe expira en aproximadamente 1 hora (3600 segundos)
      expect(expiresIn).toBeGreaterThan(3500);
      expect(expiresIn).toBeLessThanOrEqual(3600);
    });

    it('Debe generar diferentes tokens para diferentes usuarios', () => {
      const token1 = generateToken({ username: 'user1' });
      const token2 = generateToken({ username: 'user2' });

      expect(token1).not.toBe(token2);

      const decoded1 = jwt.verify(token1, JWT_SECRET);
      const decoded2 = jwt.verify(token2, JWT_SECRET);

      expect(decoded1.username).toBe('user1');
      expect(decoded2.username).toBe('user2');
    });
  });

  describe('verifyToken middleware', () => {
    it('Debe procesar un token válido', () => {
      const token = generateToken({ username: 'admin' });
      const req = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
      const res = { status: jest.fn().returnThis(), json: jest.fn() };
      const next = jest.fn();

      verifyToken(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBeDefined();
      expect(req.user.username).toBe('admin');
    });

    it('Debe rechazar sin token', () => {
      const req = { headers: {} };
      const res = { status: jest.fn().returnThis(), json: jest.fn() };
      const next = jest.fn();

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token no proporcionado' });
      expect(next).not.toHaveBeenCalled();
    });

    it('Debe rechazar token inválido', () => {
      const req = {
        headers: {
          authorization: 'Bearer invalid_token_xyz'
        }
      };
      const res = { status: jest.fn().returnThis(), json: jest.fn() };
      const next = jest.fn();

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
      expect(next).not.toHaveBeenCalled();
    });

    it('Debe rechazar token expirado', () => {
      // Generar token que expira inmediatamente
      const token = jwt.sign(
        { username: 'admin' },
        JWT_SECRET,
        { expiresIn: '0s' }
      );

      // Esperar a que expire
      setTimeout(() => {
        const req = {
          headers: {
            authorization: `Bearer ${token}`
          }
        };
        const res = { status: jest.fn().returnThis(), json: jest.fn() };
        const next = jest.fn();

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalled();
      }, 100);
    });

    it('Debe aceptar token sin "Bearer" prefix', () => {
      const token = generateToken({ username: 'admin' });
      const req = {
        headers: {
          authorization: token // Sin "Bearer" prefix
        }
      };
      const res = { status: jest.fn().returnThis(), json: jest.fn() };
      const next = jest.fn();

      verifyToken(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user.username).toBe('admin');
    });
  });
});
