const express = require('express');
const router = express.Router();

const {
    getAllAuthors,
    getAuthorById,
    create,
    update,
    remove
} = require('../services/authorsService');

router.get('/', async (req, res) => {
    const authors = await getAllAuthors();
    try {
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'No se pudieron obtener los autores' });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const author = await getAuthorById(id);
   try {     
    if (author) {
            res.json(author);
    } else {
            res.status(404).json({ message: 'Autor no encontrado' });
        }
} catch (error) {
        res.status(500).json({ message: 'No se pudo obtener el autor' });
    }
});

router.post('/', async (req, res) => {
     if (!req.body.name || !req.body.email) {
        res.status(400).json({ message: 'Nombre y email son requeridos' });
    } else {
        const newAuthor = await create(req.body);
        res.status(201).json(newAuthor);
    }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAuthor = await update(id, req.body);
    try {
    if (updatedAuthor) {
        res.json(updatedAuthor);
    } else {
        res.status(404).json({ message: 'Autor no encontrado' });
    }
} catch (error) {
        res.status(500).json({ message: 'No se pudo actualizar el autor' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const deletedAuthor = await remove(id);
    try {
        if (deletedAuthor) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el autor' });
    }
});

module.exports = router;