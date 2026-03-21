const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras']
    },
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio'], 
        unique: true, 
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor, ingrese un email válido']
    }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);