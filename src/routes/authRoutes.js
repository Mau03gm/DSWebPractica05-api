const express = require('express');
const router = express.Router();

module.exports = (container) => {
    const authService = container.resolve('authService');

    router.post('/registrar', async (req, res) => {
        const usuarioData = req.body;

        return authService.registrar(usuarioData)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(500).json({ message: 'Error al registrar', error: error.message }));
    });

    router.post('/login', async (req, res) => {
        const { correo, contraseña } = req.body;

        return authService.login(correo, contraseña)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(500).json({ message: 'Error al iniciar sesión', error: error.message }));
    });

    router.post('/logout', async (req, res) => {
        const token = req.headers.authorization;

        return authService.logout(token)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(500).json({ message: 'Error al cerrar sesión', error: error.message }));
    });

    return router;
};