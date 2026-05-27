const pool = require('../db/pool');

const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM posts');
  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

const getPostsByAuthor = async (authorId) => {
    const result = await pool.query('SELECT * FROM posts WHERE author_id = $1', [authorId]);
    return result.rows;
};


const create = async (data) => {
  const result = await pool.query(
    'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [data.title, data.content, data.author_id, data.published ?? false]
  );
  return result.rows[0];
};

  
const update = async (id, data) => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *',
    [data.title, data.content, data.author_id, data.published, id]
  );
  return result.rows[0] || null;
};


const remove = async (id) => {
  const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  return result.rowCount > 0;
};


module.exports = { getAllPosts, getPostById, getPostsByAuthor, create, update, remove };