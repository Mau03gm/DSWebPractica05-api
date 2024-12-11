const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    descripcion: { type: String, required: true },
    precio: { 
        type: Number, 
        required: true, 
        min: [0, 'El precio debe ser un valor positivo']
    }    
});

const Producto = mongoose.model('Productos', productoSchema, 'productos');
module.exports = Producto;