const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true
    },
    completada: {
        type: Boolean,
        default: false
    },
    descripcion: {
        type: String,
        required: false
    },
    prioridad: {
        type: String,
        enum: ['alta', 'media', 'baja'],
        default: 'media'
    },
    fechaLimite: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Producto', productoSchema);