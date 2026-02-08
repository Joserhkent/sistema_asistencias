const pool = require('./config/database');

async function testConexion() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(' Conectado a PostgreSQL');
    console.log(res.rows[0]);
    process.exit();
  } catch (error) {
    console.error(' Error de conexión:', error.message);
    process.exit(1);
  }
}

testConexion();
