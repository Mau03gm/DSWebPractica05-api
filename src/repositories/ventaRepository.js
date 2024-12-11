const BaseRepository = require('./baseRepository');

class VentaRepository extends BaseRepository {
    constructor({ Venta }) {
        super(Venta);
    }

    // Método para obtener ventas por ID de cliente
    async getByClientId(clienteId) {
        try {
            const ventas = await this.model.find({ 'cliente._id': clienteId });
            return ventas;
        } catch (error) {
            throw new Error('Error al obtener las ventas por cliente');
        }
    }
}

module.exports = VentaRepository;