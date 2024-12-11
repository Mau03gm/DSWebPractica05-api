const express = require('express');
const router = express.Router();

module.exports = (container) => {
    const ventaService = container.resolve('ventaService');

    // Definir subrutas para ventas
    router.get('/', async (req, res) => {
        try {
            const ventas = await ventaService.getAll();
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener ventas', error });
        }
    });

    router.get('/cliente/:clienteId', async (req, res) => {
        try {
            const clienteId = req.params.clienteId;
            const ventas = await ventaService.getByClientId(clienteId);
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener ventas del cliente', error });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const venta = await ventaService.getById(id);
            res.status(200).json(venta);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener venta', error });
        }
    });

    router.post('/', async (req, res) => {
        try {
            const venta = req.body;
            const newVenta = await ventaService.create(venta);
            res.status(201).json(newVenta);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear venta', error });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await ventaService.delete(id);
            res.status(200).json({ message: 'Venta eliminada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar venta', error });
        }
    });

    return router;
};