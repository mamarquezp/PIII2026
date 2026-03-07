const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let productos = [
    { id: 1, nombre: 'Laptop', precio: 5000, stock: 10 },
    { id: 2, nombre: 'Mouse', precio: 150, stock: 50 },
    { id: 3, nombre: 'Teclado', precio: 300, stock: 30 }
];

app.get('/productos', (req, res) => { // devuelve todos
    res.status(200).json(productos);
});

app.get('/productos/:id', (req, res) => { //devuelve 1 por ID
    const idBuscado = parseInt(req.params.id);
    const producto = productos.find(p => p.id === idBuscado);

    if (producto) {
        res.status(200).json(producto);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

app.post('/productos', (req, res) => { // crea producto
    const { nombre, precio, stock } = req.body;

    if (!nombre) { // Validación de campos obligatorios
        return res.status(400).json({ 
            mensaje: 'Falta campo obligatiorio: nombre' 
        });
    }
     if (precio === undefined) {
        return res.status(400).json({ 
                mensaje: 'Falta campo obligatiorio: precio' 
            });
     }
    if (stock === undefined) {
        return res.status(400).json({ 
                mensaje: 'Falta campo obligatiorio: stock' 
            });
     }

    const nuevoProducto = {
        id: productos.length + 1, // ID automático y único
        nombre: nombre,
        precio: precio,
        stock: stock
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.delete('/productos/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const indexDel = productos.findIndex((prodObj) => prodObj.id == idParam);

    if (indexDel !== -1) {
        productos.splice(indexDel, 1);
        res.status(200).json({ mensaje: `Se eliminó el producto con id ${idParam}` });
    } else {
        res.status(404).json({ mensaje: "No se encontró el producto para eliminar" }); // si no lo encontró
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});