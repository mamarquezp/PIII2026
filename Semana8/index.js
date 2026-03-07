const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Producto = require('./models/Producto'); 

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión exitosa'))
    .catch(err => console.error('Error', err));

// GET filtros y paginación
app.get('/productos', async (req, res) => {
    try {
        let { categoria, minPrecio, maxPrecio, pagina = 1, limite = 10 } = req.query;
        pagina = Number(pagina);
        limite = Number(limite);

        let filtro = {};
        if (categoria) {
            filtro.categoria = categoria;
        }
        if (minPrecio || maxPrecio) {
            filtro.precio = {};
            if (minPrecio) filtro.precio.$gte = Number(minPrecio);
            if (maxPrecio) filtro.precio.$lte = Number(maxPrecio); 
        }

        const skip = (pagina - 1) * limite; 

        const productos = await Producto.find(filtro)
            .skip(skip)
            .limit(limite)
            .sort('-createdAt');

        const total = await Producto.countDocuments(filtro);

        res.json({
            total,
            pagina,
            paginasTotales: Math.ceil(total / limite),
            datos: productos
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

// GET producto por ID
app.get('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
});

// POST 
app.post('/productos', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el producto', error });
    }
});

// PUT
app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(productoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el producto', error });
    }
});

// DELETE
app.delete('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);
        
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error });
    }
});

app.listen(3000, () => console.log('Server en puerto 3000'));