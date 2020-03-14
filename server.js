const express = require('express');
const path = require('path');

require('./firebase.config');

const PORT = process.env.PORT | 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'frontend/', 'build/')));
app.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
