const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.statusCode && err.message) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err.code === '23505') {
        return res.status(409).json({ message: 'El email ya está registrado' });
    }

    if (err.code === '23503') {
        const detail = err.detail || '';
        if (detail.includes('(author_id)')) {
            return res.status(404).json({ message: 'El autor referenciado no existe' });
        }
        if (detail.includes('(post_id)')) {
            return res.status(404).json({ message: 'El post referenciado no existe' });
        }
        return res.status(404).json({ message: 'El recurso referenciado no existe' });
    }

    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
};

module.exports = errorHandler;