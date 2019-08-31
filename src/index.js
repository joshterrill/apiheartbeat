const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddleware = require('express-jwt-middleware');
const jwtCheck = jwtMiddleware(process.env.JWT_SECRET);

const scheduler = require('./lib/scheduler');

const endpointRoutes = require('./app/endpoint/endpoint.routes');
const authRoutes = require('./app/auth/auth.routes');

const app = express();
const port = process.env.PORT || 3000;

function init() {
  app.use(bodyParser({extended: true}));

  app.use(compression());
  app.use(express.static('public/compiled'))

  app.use('/api/auth', authRoutes());
  app.use('/api/endpoint', jwtCheck, endpointRoutes());

  mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
      console.error('Error connecting to mongoose database', err);
      return;
    }

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      if (process.env.NODE_ENV !== 'development') {
        scheduler.startScheduler();
      }
    });
  });
}

module.exports = init;