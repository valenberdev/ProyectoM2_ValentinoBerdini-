const express = require('express');
const router = express.Router({ mergeParams: true });
const { getCommentsByPost, create } = require('../services/commentsService');

router.get('/:id/comments', async (req, res, next) => {
    const postId = parseInt(req.params.id);
    try {
        const comments = await getCommentsByPost(postId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.post('/:id/comments', async (req, res, next) => {
    const postId = parseInt(req.params.id);
    if (!req.body.content || !req.body.author_id) {
        return res.status(400).json({ message: 'Contenido y ID de autor son requeridos' });
    }
    try {
        const comment = await create({ post_id: postId, author_id: req.body.author_id, content: req.body.content });
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

module.exports = router;