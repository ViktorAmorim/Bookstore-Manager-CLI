import pool from './connection';

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(' Conexão bem-sucedida! Hora do servidor:', res.rows[0].now);
  } catch (err: any) {
    console.error(' Falha na conexão:', err.message);
  } finally {
    await pool.end();
  }
}

testConnection();
