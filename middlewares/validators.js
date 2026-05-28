const isNonEmptyString = (value) => (
  typeof value === 'string' && value.trim().length > 0
);

const isStrictPositiveInteger = (value) => (
  typeof value === 'number' && Number.isInteger(value) && value > 0
);

const isValidEmail = (value) => (
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
);

const validateAuthor = (req, res, next) => {
  const { name, email } = req.body;

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ message: 'El nombre es obligatorio y debe ser texto no vacío' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'El correo es obligatorio y debe tener formato válido' });
  }

  next();
};

const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;

  if (!isNonEmptyString(title)) {
    return res.status(400).json({ message: 'El título es obligatorio y debe ser texto no vacío' });
  }

  if (!isNonEmptyString(content)) {
    return res.status(400).json({ message: 'El contenido es obligatorio y debe ser texto no vacío' });
  }

  if (!isStrictPositiveInteger(author_id)) {
    return res.status(400).json({ message: 'El ID del autor es obligatorio y debe ser un entero positivo' });
  }

  next();
};

const validateIdParam = (paramName) => (req, res, next) => {
  const rawValue = req.params[paramName];

  if (!/^\d+$/.test(rawValue)) {
    return res.status(400).json({ message: 'El ID debe ser un entero positivo válido' });
  }

  const value = Number(rawValue);
  if (!Number.isSafeInteger(value) || value <= 0) {
    return res.status(400).json({ message: 'El ID debe ser un entero positivo válido' });
  }

  next();
};

const validateComment = (req, res, next) => {
  const { content, author_id } = req.body;

  if (!isNonEmptyString(content)) {
    return res.status(400).json({ message: 'El contenido es obligatorio y debe ser texto no vacío' });
  }

  if (!isStrictPositiveInteger(author_id)) {
    return res.status(400).json({ message: 'El ID de autor es obligatorio y debe ser un entero positivo' });
  }

  next();
};

module.exports = {validateAuthor,validatePost,validateIdParam,validateComment,};