const pool = require('../db/pool');

const getAllAuthors = async () => {
  const result = await pool.query('SELECT * FROM authors');
  return result.rows;
};

const getAuthorById = async (id) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(
  'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
  [data.name, data.email, data.bio]);
return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(
    'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
    [data.name, data.email, data.bio, id]
  );
  return result.rows[0] || null;
};

const remove = async (id) => {
  const result = await pool.query('DELETE FROM authors WHERE id = $1', [id]);
  return result.rowCount > 0;
};

module.exports = { getAllAuthors, getAuthorById, create, update, remove };