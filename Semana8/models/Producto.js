const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        required: true,
        enum: ['electrónica', 'ropa', 'alimentos']
    },
    stock: { type: Number, default: 0 },
    descripcion: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Producto', productoSchema);