let posts = [
  {
    id: 1,

    title: "Introducción a Node.js",

    content: "Node.js es un runtime de JavaScript...",

    author_id: 1,

    published: true,
  },

  {
    id: 2,

    title: "PostgreSQL vs MySQL",

    content: "Ambas bases de datos tienen ventajas...",

    author_id: 2,

    published: true,
  },

  {
    id: 3,

    title: "APIs RESTful",

    content: "REST es un estilo arquitectónico...",

    author_id: 1,

    published: true,
  },

  {
    id: 4,

    title: "Manejo de errores en Express",

    content: "El manejo apropiado de errores...",

    author_id: 3,

    published: false,
  },

  {
    id: 5,

    title: "Async/Await explicado",

    content: "Las promesas simplifican el código asíncrono...",

    author_id: 3,

    published: false,
  },
];

const getAllPosts = () => {
  return posts;
};

const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

const create = (data) => {
  const id = Date.now();

  const newPost = {
    id,
    ...data
  };

  posts.push(newPost);

  return newPost;
};

const update = (id, data) => {
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...data, id };
    return posts[index];
  }
  return null;
};

const remove = (id) => {
  const initialLength = posts.length;
  posts = posts.filter(post => post.id !== id);
  return posts.length < initialLength;
};