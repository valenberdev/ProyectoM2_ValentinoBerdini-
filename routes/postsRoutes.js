const express = require('express');
const router = express.Router();

const {
    getAllPosts,
    getPostById,
    create,
    update,
    remove
} = require('../services/postsService');

router.get('/', (req, res) => {
    const posts = getAllPosts();
    try {
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'No se pudieron obtener los posts' });
    }
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = getPostById(id);
    try {
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'No se pudo obtener el post' });
    }
});

router.get('/author/:author_id', (req, res) => {
    const author_id = parseInt(req.params.author_id);
    const posts = getAllPosts().filter(post => post.author_id === author_id);
    try {
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'No se pudieron obtener los posts' });
    }
});

router.post('/', (req, res) => {
    const newPost = create(req.body);
    try {
        if (req.body.title && req.body.content && req.body.author_id) {
            res.status(201).json(newPost);
        } else {
            res.status(400).json({ message: 'Título, contenido y ID de autor son requeridos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'No se pudo crear el post' });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPost = update(id, req.body);
    try {
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'No se pudo actualizar el post' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const removedPost = remove(id);
    try {
        if (removedPost) {
            res.status(204).json({ message: 'Post eliminado correctamente' });
        } else {    
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el post' });
    }
});

module.exports = router;