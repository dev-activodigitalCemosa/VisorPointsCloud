const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.BACKEND_PORT || 4321; // Puerto para el servidor backend
app.use(cors());

//Configurar conexión a la base de datos
const client = new Client({
  user: 'develop',
  host: 'localhost',
  database: 'develop',
  password: '12345',
  port: 5432,
});
client.connect();

app.get('/nube-puntos', async (req, res) => {
  try {
    const result = await client.query('SELECT nombre FROM nube_puntos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener nubes de puntos:', error);
    res.status(500).json({ error: 'Error al obtener nubes de puntos' });
  }
});

app.get('/ruta/:nom', async (req, res) => {
  try {
    const { nom } = req.params;
    const result = await client.query('SELECT ruta FROM nube_puntos where nombre = $1',[nom]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener nubes de puntos:', error);
    res.status(500).json({ error: 'Error al obtener la ruta' });
  }
});

app.get('/usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
});

// // Montar el servidor 
const server = app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

module.exports = server;
