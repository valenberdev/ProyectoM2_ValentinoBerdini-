require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());

app.use('/authors', require('./routes/authorsRoutes'));
app.use('/posts', require('./routes/postsRoutes'));
app.use('/posts', require('./routes/commentsRoutes'));
app.use(errorHandler);

module.exports = app;