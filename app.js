require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use('/authors', require('./routes/authorsRoutes'));
app.use('/posts', require('./routes/postsRoutes'));
app.use(errorHandler);

/* app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 */

module.exports = app;