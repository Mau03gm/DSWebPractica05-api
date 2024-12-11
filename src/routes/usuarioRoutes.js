const express = require('express');
const router = express.Router();

module.exports = (container) => {
    const usuarioService = container.resolve('usuarioService');

    // Definir subrutas para usuarios
    router.get('/', async (req, res) => {
        try {
            const usuarios = await usuarioService.getAll();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios', error });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await usuarioService.getById(id);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario', error });
        }
    });

    router.get('/correo/:correo', async (req, res) => {
        try {
            const correo = req.params.correo;
            const usuario = await usuarioService.getByCorreo(correo);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario por correo', error });
        }
    });

    router.get('/nombre/:nombre', async (req, res) => {
        try {
            const nombre = req.params.nombre;
            const usuario = await usuarioService.getByNombre(nombre);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario por nombre', error });
        }
    });

    router.post('/', async (req, res) => {
        try {
            const usuario = req.body;
            const newUsuario = await usuarioService.create(usuario);
            res.status(201).json(newUsuario);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear usuario', error });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = req.body;
            const updatedUsuario = await usuarioService.update(id, usuario);
            res.status(200).json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario', error });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await usuarioService.delete(id);
            res.status(200).json({ message: 'Usuario eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar usuario', error });
        }
    });

    return router;
};