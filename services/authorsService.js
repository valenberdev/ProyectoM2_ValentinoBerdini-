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


const getAllAuthors = () => {
  return authors;
};

const getAuthorById = (id) => {
  return authors.find(author => author.id === id);
};

const create = (data) => {
  const id = Date.now();

  const newAuthor = {
    id,
    ...data
  };

  authors.push(newAuthor);

  return newAuthor;
};

const update = (id, data) => {
  const index = authors.findIndex(author => author.id === id);
  if (index !== -1) {
    authors[index] = { ...authors[index], ...data, id };
    return authors[index];
  }
  return null;
};

const remove = (id) => {
  const initialLength = authors.length;
  authors = authors.filter(author => author.id !== id);
  return authors.length < initialLength;
};