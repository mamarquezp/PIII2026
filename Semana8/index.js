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

// GET productos todos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
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

// GET producto por filtro

app.get('/productos', async (req, res) => {
    try {
        const { categoria, minPrecio, maxPrecio, pagina = 1, limite = 10 } = req.query;
        let filtro = {};

        if (categoria) {
            filtro.categoria = categoria;
        }

        if (minPrecio || maxPrecio) {
            filtro.precio = {};
            if (minPrecio) filtro.precio.$gte = Number(minPrecio);
            if (maxPrecio) filtro.precio.$lte = Number(maxPrecio);
        }

        const skip = (Number(pagina) - 1) * Number(limite);

        const productos = await Producto.find(filtro)
            .sort('-createdAt')
            .skip(skip)
            .limit(Number(limite));

        const total = await Producto.countDocuments(filtro);

        res.json({
            total,
            pagina: Number(pagina),
            paginasTotales: Math.ceil(total / limite),
            datos: productos
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

// POST

app.post('/productos', async (req, res) => {
    try {
        const { nombre, precio, categoria, stock, descripcion } = req.body;
        const nuevoProducto = new Producto({ nombre, precio, categoria, stock, descripcion });
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear producto', error });
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
        res.status(400).json({ mensaje: 'Error al actualizar producto', error });
    }
});

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

app.listen(3000, () => console.log('Server en 3000')
);