const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const middlewares = require('./lib/middlewares');
const scheduler = require('./lib/scheduler');

const endpointRoutes = require('./app/endpoint/endpoint.routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

function init() {
  app.use(bodyParser({extended: true}));
  app.use(compression());

  app.use('/api/endpoint', middlewares.checkToken, endpointRoutes());

  mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
      console.error('Error connecting to mongoose database', err);
      return;
    }

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      // scheduler.startScheduler();
    });
  });
}

module.exports = init;