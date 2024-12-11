const BaseRepository = require('./baseRepository');

class ProductoRepository extends BaseRepository {
    constructor({ Producto }) {
        super(Producto);
    }

    async getByDescripcion(descripcion) {
        return await this.model.find({
            descripcion: new RegExp(descripcion, 'i')
        });
    }
}

module.exports = ProductoRepository;