/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */
/* eslint-disable max-params */
'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('dev'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const pets = require('./routes/pets');

app.use(pets);

app.use((_req, res, _next) => {
  return res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);

  return res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
