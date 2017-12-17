const path = require('path');
const express = require('express');
const router = require('./router');
const bot = require('./bot/bot');

const app = express();

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

router(app);

setInterval(() => {
  bot();
}, 5000);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
