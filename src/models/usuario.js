const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String },
    rol: { 
        type: String, 
        required: true,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    },
});

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contraseña')) return next();
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
});

usuarioSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.contraseña) {
        const salt = await bcrypt.genSalt(10);
        update.contraseña = await bcrypt.hash(update.contraseña, salt);
        this.setUpdate(update); 
    }

    next();
});

usuarioSchema.methods.comparePassword = async function (contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

const Usuario = mongoose.model('Usuarios', usuarioSchema, 'usuarios');
module.exports = Usuario;