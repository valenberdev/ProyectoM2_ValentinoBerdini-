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
    res.json(posts);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = getPostById(id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

router.post('/', (req, res) => {
    const newPost = create(req.body);
    if (newPost) {
        res.status(201).json(newPost);
    } else {
        res.status(400).json({ message: 'Failed to create post' });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPost = update(id, req.body);
    if (updatedPost) {
        res.json(updatedPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const removedPost = remove(id);
    if (removedPost) {
        res.json(removedPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

module.exports = router;