const mongoose = require('mongoose');

const connectToDatabase = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        throw error;
    }
};

module.exports = connectToDatabase;
