require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');
const Post = require('./models/Post'); 

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

app.post('/usuarios', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

app.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        
        const posts = await Post.find({ usuario: req.params.id });
        
        res.json({ usuario, posts });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


app.post('/posts', async (req, res) => {
    try {
        const post = new Post({
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            usuario: req.body.usuarioId 
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('usuario', 'nombre email');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

app.put('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Post eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

app.get('/usuarios/:id/posts', async (req, res) => {
    try {
        const posts = await Post.find({ usuario: req.params.id });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));