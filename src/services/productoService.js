const BaseService = require('./baseService');

class ProductoService extends BaseService {
    constructor({ productoRepository }) {
        super(productoRepository);
    }

    async getByDescripcion(descripcion) {
        if (!descripcion) {
            throw new Error('Falta la descripción del producto');
        }
    
        try {
            const productos = await this.repository.getByDescripcion(descripcion);
            if (productos.length === 0) {
                throw new Error('No se encontraron productos con esa descripción');
            }
            return productos;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = ProductoService;
