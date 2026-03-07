const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Tarea = require('./models/Tarea.js')

const app = express();

app.use(express.json());

//conectar DB
mongoose.connect(process.env.MONGODB_URI)
.then (() => console.log('Conexión exitosa'))
.catch(err => console.error('Error',err));

// GET tareas
app.get('/tareas', async (req, res) => {
    const tareas = await Tarea.find().sort('-createdAt');
    res.json(tareas);
});

// POST 
app.post('/tareas', async (req, res) => {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
})

app.listen(3000, () => console.log('Server en 3000')
);