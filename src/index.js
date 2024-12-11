require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./config/database');
const configureMiddlewares = require('./config/middlewares');
const configureContainer = require('./config/container');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Conectar a MongoDB
connectToDatabase(MONGO_URI);

// Configuración de middlewares
configureMiddlewares(app);

// Configuración de dependencias (Awilix)
const container = configureContainer();
app.use(require('awilix-express').scopePerRequest(container));

// Configuración de rutas
const routes = require('./routes')(container);
app.use('/api', routes);

// Escuchar en el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
