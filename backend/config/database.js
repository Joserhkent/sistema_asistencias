const { Pool } = require('pg');
require('dotenv').config();

// Validar que existen las variables de entorno requeridas
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
const missingVars = requiredEnvVars.filter(variable => !process.env[variable]);

if (missingVars.length > 0) {
  throw new Error(`Variables de entorno requeridas no configuradas: ${missingVars.join(', ')}. 
  Por favor copia .env.example a .env y configura los valores.`);
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

// Verificar conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error conectando a PostgreSQL:', err.stack);
  } else {
    console.log('Conectado a PostgreSQL');
    release();
  }
});

module.exports = pool;
