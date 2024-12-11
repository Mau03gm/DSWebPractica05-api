const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true }
});

const DetalleVentaSchema = new mongoose.Schema({
    producto: { type: ProductoSchema, required: true },
    cantidad: { type: Number, required: true },
    subtotal: { type: Number, required: true }
});

const ClienteSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    nombre: { type: String, required: true },
    correo: { type: String, required: true }
});

const VentaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true, default: Date.now },
    cliente: { type: ClienteSchema, required: true },
    detalle: { type: [DetalleVentaSchema], required: true },
    total: { type: Number, required: true }
});

const Venta = mongoose.model('Venta', VentaSchema, 'ventas');
module.exports = Venta;
