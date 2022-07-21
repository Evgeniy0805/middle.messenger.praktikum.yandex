const path = require('path');

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '/dist')));
const routs = [
  '/',
  '/registration',
  '/chats',
  '/profile',
  '/err404',
  '/err500'
]

routs.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});