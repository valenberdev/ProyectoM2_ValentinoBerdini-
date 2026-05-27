const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code === '23505') {
        return res.status(409).json({ message: 'El email ya está registrado' });
    }

    if (err.code === '23503') {
        return res.status(400).json({ message: 'El recurso referenciado no existe' });
    }

    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
};

module.exports = errorHandler;