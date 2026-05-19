const pool = require('../db/pool');

const getCommentsByPost = async (postId) => {
    const result = await pool.query(
        'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
        [postId]
    );
    return result.rows;
};

const create = async (data) => {
    const result = await pool.query(
        'INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3) RETURNING *',
        [data.post_id, data.author_id, data.content]
    );
    return result.rows[0];
};

module.exports = { getCommentsByPost, create };