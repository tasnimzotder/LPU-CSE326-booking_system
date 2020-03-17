const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('./firebase.config');

const PORT = process.env.PORT | 3001;
const app = express();

app.use(express.static(path.join(__dirname, 'frontend/', 'build/')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

const contactData = [];

app.post('/api/form/contact', (req, res, next) => {
  const contactDataX = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  if (!contactDataX) {
    contactData.push(contactDataX);
    res.status(200).json(contactData);
  } else {
    res.status(500).json({
      message: "Error: Can't POST blank data"
    });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
