const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: [true, 'El título es obligatorio'] 
    },
    contenido: { 
        type: String, 
        required: [true, 'El contenido no puede estar vacío'] 
    },
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: [true, 'El ID del usuario es obligatorio'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);