const express = require('express');
const router = express.Router();

const {
    getAllAuthors,
    getAuthorById,
    create,
    update,
    remove
} = require('../services/authorsService');

router.get('/', (req, res) => {
    const authors = getAllAuthors();
    res.json(authors);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = getAuthorById(id);
    if (author) {
        res.json(author);
    } else {
        res.status(404).json({ message: 'Author not found' });
    }
});

router.post('/', (req, res) => {
    const newAuthor = create(req.body);
    if (newAuthor) {
        res.status(201).json(newAuthor);
    } else {
        res.status(400).json({ message: 'Failed to create author' });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAuthor = update(id, req.body);
    if (updatedAuthor) {
        res.json(updatedAuthor);
    } else {
        res.status(404).json({ message: 'Author not found' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedAuthor = remove(id);
    if (deletedAuthor) {
        res.json({ message: 'Author deleted successfully' });
    } else {
        res.status(404).json({ message: 'Author not found' });
    }
});

module.exports = router;