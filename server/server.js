const path = require('path');
const express = require('express');
const api = require('./api');
const connection = require('./db');
const startBot = require('./bot')

const app = express();

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

setInterval (() => {
  startBot(connection);
}, 3000);

api(app, connection);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
