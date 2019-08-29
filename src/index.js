const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const routes = require('./routes/index');
const middlewares = require('./lib/middlewares');
const scheduler = require('./lib/scheduler');
const notifiers = require('./lib/notifiers');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser({extended: true}));
app.use(compression());

app.use('/api/endpoint', middlewares.checkToken, routes.endpoint());
app.use('/api', routes.api());

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.error('Error connecting to mongoose database', err);
    return;
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    scheduler.startScheduler();
  });
});

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});