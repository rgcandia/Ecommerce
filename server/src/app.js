const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');

const app = express();

// Nombre de la app (útil para logs o identificación)
app.name = 'Ecommerce Server';

// --- MIDDLEWARES ---
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Configuración manual de Headers (CORS extendido)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// --- RUTAS ---
app.use('/', routes);

// --- ERROR HANDLING (Opcional pero recomendado para escalabilidad) ---
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;