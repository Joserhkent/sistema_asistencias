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

// Configurar CORS desde variables de entorno
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:3000', 'http://localhost:3001'];

// Middlewares
app.use(cors({
  origin: allowedOrigins,
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
