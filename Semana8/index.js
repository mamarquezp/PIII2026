const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Producto = require('./models/Producto.js')

const app = express();

app.use(express.json());

//conectar DB
mongoose.connect(process.env.MONGODB_URI)
.then (() => console.log('Conexión exitosa'))
.catch(err => console.error('Error',err));

// GET tareas
app.get('/productos', async (req, res) => {
    const productos = await Producto.find().sort('-createdAt');
    res.json(productos);
});

// POST 
app.post('/productos', async (req, res) => {
    try {
        const { titulo, descripcion, prioridad, fechaLimite } = req.body;
        const nuevaTarea = new Producto({
            titulo,
            descripcion,
            prioridad,
            fechaLimite
        });
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la producto', error });
    }
});

// PUT
app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, completada, descripcion, prioridad, fechaLimite } = req.body;
        
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { titulo, completada, descripcion, prioridad, fechaLimite },
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrada' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el producto', error });
    }
});

app.listen(3000, () => console.log('Server en 3000')
);