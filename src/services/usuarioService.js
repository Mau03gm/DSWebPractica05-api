const BaseService = require('./baseService');

class UsuarioService extends BaseService {
    constructor({ usuarioRepository }) {
        super(usuarioRepository);
    }

    async create(usuario) {
        if(!usuario.nombre || !usuario.correo) {
            throw new Error('Faltan datos');
        }

        return await super.create(usuario);
    }

    async getByCorreo(correo) {
        if(!correo) {
            throw new Error('Falta el correo');
        }

        return await this.repository.getByCorreo(correo);
    }

    async getByNombre(nombre) {
        if(!nombre) {
            throw new Error('Falta el nombre');
        }

        return await this.repository.getByNombre(nombre);
    }
}

module.exports = UsuarioService;