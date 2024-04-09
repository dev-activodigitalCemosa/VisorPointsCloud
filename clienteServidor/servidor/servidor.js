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

// Ruta para obtener datos de la base de datos
app.get('/datos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM nube_puntos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// // Montar el servidor 
const server = app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

module.exports = server;
