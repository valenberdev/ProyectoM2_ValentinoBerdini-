const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/authors', require('./routes/authorsRoutes'));
app.use('/posts', require('./routes/postsRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
