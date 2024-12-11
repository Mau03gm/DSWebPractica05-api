const BaseService = require('./baseService');

class VentaService extends BaseService {
    constructor({ ventaRepository }) {
        super(ventaRepository);
        this.ventaRepository = ventaRepository;
    }

    // Obtener ventas por cliente
    async getByClientId(clienteId) {
        try {
            const ventas = await this.ventaRepository.getByClientId(clienteId);
            return ventas;
        } catch (error) {
            throw new Error('Error al obtener ventas por cliente', error);
        }
    }
}

module.exports = VentaService;