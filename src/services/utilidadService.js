const { generarPDFVenta } = require('../utils/pdfUtil');
const { enviarCorreo } = require('../utils/correoUtil');

class UtilidadService {
    constructor({ ventaRepository }) {
        this.ventaRepository = ventaRepository;
    }

    async generarReporteVenta(idVenta) {
        const venta = await this.ventaRepository.getById(idVenta);
        if (!venta) {
            throw new Error('Venta no encontrada');
        }

        const outputPath = generarPDFVenta(venta, idVenta);
        return outputPath;
    }

    async enviarReporte(idVenta) {
        const venta = await this.ventaRepository.getById(idVenta);
        if (!venta) {
            throw new Error('Venta no encontrada');
        }

        const outputPath = await this.generarReporteVenta(idVenta);

        try {
            await enviarCorreo({
                destinatario: venta.cliente.correo,
                asunto: `Reporte de Venta #${idVenta}`,
                texto: `Hola ${venta.cliente.nombre},\n\nAdjunto encontrarás el reporte de tu compra.\n\nGracias por tu preferencia.`,
                adjuntos: [
                    {
                        filename: `reporteVenta_${idVenta}.pdf`,
                        path: outputPath, 
                    },
                ],
            });

            console.log('Correo enviado exitosamente al cliente:', venta.cliente.correo);
        } catch (error) {
            console.error('Error al enviar el correo:', error.message);
            throw new Error('No se pudo enviar el correo al cliente.');
        }

        return 'Correo enviado exitosamente';
    }
}

module.exports = UtilidadService;
