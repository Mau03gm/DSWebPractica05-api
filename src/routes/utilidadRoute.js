const express = require('express');
const router = express.Router();

module.exports = (container) => {
    const utilidadService = container.resolve('utilidadService');

    // Definir subrutas para utilidades
    router.get('/reporte-venta/:idVenta', async (req, res) => {
        try {
            const idVenta = req.params.idVenta;
            await utilidadService.generarReporteVenta(idVenta);
            res.status(200).json({ message: 'Reporte generado exitosamente en Descargas.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al generar reporte de venta', error });
        }
    });

    router.get('/enviar-reporte/:idVenta', async (req, res) => {
        try {
            const idVenta = req.params.idVenta;
            await utilidadService.enviarReporte(idVenta);
            res.status(200).json({ message: 'Reporte enviado exitosamente al cliente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al enviar reporte de venta', error });
        }
    });

    return router;
};

