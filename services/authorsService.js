const pool = require('../db/pool');

let authors = [
  {
    id: 1,
    name: "Ana García",
    email: "ana@example.com",
    bio: "Desarrolladora full-stack apasionada por Node.js",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    bio: "Escritor técnico especializado en bases de datos",
  },
  {
    id: 3,
    name: "María López",
    email: "maria@example.com",
    bio: "Ingeniera de software con foco en APIs REST",
  },
];


const getAllAuthors = async () => {
  const result = await pool.query('SELECT * FROM authors');
  return result.rows;
};

const getAuthorById = async (id) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (data) => {
  const id = Date.now();

  const newAuthor = {
    id,
    ...data
  };

  await pool.query('INSERT INTO authors (id, name, email, bio) VALUES ($1, $2, $3, $4)', [newAuthor.id, newAuthor.name, newAuthor.email, newAuthor.bio]);

  return newAuthor;
};

const update = async (id, data) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  if (result.rows.length > 0) {
    await pool.query('UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4', [data.name, data.email, data.bio, id]);
    const updatedResult = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return updatedResult.rows[0];
  }
  return null;
};

const remove = async (id) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  if (result.rows.length > 0) {
    await pool.query('DELETE FROM authors WHERE id = $1', [id]);
    return true;
  }
  return false;
};