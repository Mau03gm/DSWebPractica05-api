const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/tokenUtil');

// Importar rutas específicas
const usuarioRoutes = require('./usuarioRoutes');
const productoRoutes = require('./productoRoutes');
const ventaRoutes = require('./ventaRoutes');
const utilidadRoutes = require('./utilidadRoute');
const authRoutes = require('./authRoutes');

module.exports = (container) => {
    // Rutas no protegidas
    router.use('/auth', authRoutes(container));

    //Protección de rutas
    router.use(verifyToken);

    //Rutas protegidas
    router.use('/usuario', usuarioRoutes(container));
    router.use('/producto', productoRoutes(container));
    router.use('/venta', ventaRoutes(container));
    router.use('/util', utilidadRoutes(container));

    return router;
};
