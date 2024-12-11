const { generateToken, revokeToken } = require('../utils/tokenUtil');

class AuthService {
    constructor({ usuarioService }) {
        this.usuarioService = usuarioService;
    }

    async registrar(usuario) {
        usuario.rol = 'admin';
        return await this.usuarioService.create(usuario);
    }

    async login(correo, contraseña) {
        console.log(correo, contraseña);
        const usuario = await this.usuarioService.getByCorreo(correo);
        console.log(usuario);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = await usuario[0].comparePassword(contraseña);

        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        const token = generateToken(usuario);

        return { usuario, token };
    }

    async logout(token) {
        if(!token) {
            throw new Error('Token no encontrado');
        }
        
        revokeToken(token);

        return { message: 'Sesión cerrada' };
    }
}

module.exports = AuthService;