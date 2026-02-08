const express = require("express");
const cors = require("cors");
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');
const personalRoutes = require('./routes/personal');
const asistenciasRoutes = require('./routes/asistencias');
const { verifyToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Configurar CORS - incluye dominios de Vercel directamente
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://sistemaasistencias.vercel.app',
  'https://sistema-asistencias.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('CORS - Orígenes permitidos:', allowedOrigins);

// Middlewares
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS - Origen no permitido:', origin);
      // En producción, permitir temporalmente para debug
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas públicas (sin autenticación)
app.use('/api/auth', authRoutes);

// Rutas protegidas (con autenticación JWT)
app.use('/api/personal', verifyToken, personalRoutes);
app.use('/api/asistencias', verifyToken, asistenciasRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend Sistema de Asistencia funcionando",
    endpoints: {
      auth: '/api/auth/login',
      personal: '/api/personal (protegida)',
      asistencias: '/api/asistencias (protegida)'
    }
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
