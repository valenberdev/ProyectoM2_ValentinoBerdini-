const express = require('express');
const router = express.Router({ mergeParams: true });
const { getCommentsByPost, create } = require('../services/commentsService');
const { validateIdParam, validateComment } = require('../middlewares/validators');

router.get('/:id/comments', validateIdParam("id"), async (req, res, next) => {
    const postId = parseInt(req.params.id, 10);
    try {
        const comments = await getCommentsByPost(postId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.post('/:id/comments', validateIdParam("id"), validateComment, async (req, res, next) => {
    const postId = parseInt(req.params.id, 10);
    try {
        const comment = await create({ post_id: postId, author_id: req.body.author_id, content: req.body.content });
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

module.exports = router;