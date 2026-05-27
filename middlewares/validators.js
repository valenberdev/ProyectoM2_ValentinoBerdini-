const validateAuthor = (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ message: 'El nombre y el correo del autor son requeridos' });
  }
  next();
};

const validatePost = (req, res, next) => {
  if (!req.body.title || !req.body.content || !req.body.author_id) {
    return res.status(400).json({ message: 'El título, el contenido y el ID del autor son requeridos' });
  } 
    next();
};

const validateIdParam = (paramName) => (req, res, next) => {
  const value = parseInt(req.params[paramName], 10);
  if (Number.isNaN(value)) {
    return res.status(400).json({ message: 'El ID debe ser un número válido' });
  }
  next();
};
module.exports = {validateAuthor,validatePost,validateIdParam};