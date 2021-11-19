/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

require('dotenv').config();
/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');
const { ERROR_CODE } = require('./utils/constants');
const { errorHandler } = require('./utils/utils');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// validation
// app.use(expressValidator());

// secure your private routes with jwt authentication middleware
app.all('/private/*', (req, res, next) => auth(req, res, next));

// fill routes for express application
app.use('/api/o-guest', mappedOpenRoutes);
app.use('/api/v1', mappedAuthRoutes);

app.get('*', (req, res) => {
  res.status(404).json({ msg: 'What are you looking for???' });
});
app.post('*', (req, res) => {
  res.status(404).json({ code: ERROR_CODE.ENDPOINT_NOT_FOUND, msg: 'What are you looking for???' });
});

app.use(errorHandler);

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  console.log(`App is running at port ${config.port}`);
  return DB;
});
