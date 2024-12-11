const express = require('express');
const router = express.Router();

module.exports = (container) => {
    const productoService = container.resolve('productoService');

    // Definir subrutas para productos
    router.get('/', async (req, res) => {
        try {
            const productos = await productoService.getAll();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos', error });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await productoService.getById(id);
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener producto', error });
        }
    });

    router.get('/descripcion/:descripcion', async (req, res) => {
        try {
            const descripcion = req.params.descripcion;
            const producto = await productoService.getByDescripcion(descripcion);
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener producto', error });
        }
    });

    router.post('/', async (req, res) => {
        try {
            const producto = req.body;
            const newProducto = await productoService.create(producto);
            res.status(201).json(newProducto);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear producto', error });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const producto = req.body;
            const updatedProducto = await productoService.update(id, producto);
            res.status(200).json(updatedProducto);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar producto', error });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await productoService.delete(id);
            res.status(200).json({ message: 'Producto eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar producto', error });
        }
    });

    return router;
};