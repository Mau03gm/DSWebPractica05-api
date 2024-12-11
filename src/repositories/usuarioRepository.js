const BaseRepository = require('./baseRepository');

class UsuarioRepository extends BaseRepository {
    constructor({ Usuario }) {
        super(Usuario);
    }

    async getByCorreo(correo) {
        return await this.model.find({
            correo: new RegExp(correo, 'i')
        });
    }

    async getByNombre(nombre) {
        return await this.model.find({
            nombre: new RegExp(nombre, 'i')
        });
    }
}

module.exports = UsuarioRepository;